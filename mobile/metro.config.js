const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const MOBILE_NODE_MODULES = path.resolve(__dirname, 'node_modules');

const config = getDefaultConfig(__dirname);

// Deduplicate React in monorepo: Expo's getDefaultConfig adds root node_modules
// to nodeModulesPaths, causing two React versions to coexist (mobile=19.1.0,
// root=19.2.4). Force all React imports to always resolve from mobile's own copy.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === 'react' ||
    moduleName === 'react-dom' ||
    moduleName.startsWith('react/') ||
    moduleName.startsWith('react-dom/')
  ) {
    return {
      type: 'sourceFile',
      filePath: require.resolve(moduleName, { paths: [MOBILE_NODE_MODULES] }),
    };
  }

  // Fix: "Cannot destructure property '__extends' of 'tslib.default' as it is undefined"
  // Moti (and other packages) import tslib helpers. On web, Metro resolves the ESM
  // entry point where `tslib.default` is undefined. Force Metro to use the CJS version.
  if (moduleName === 'tslib' && platform === 'web') {
    return {
      type: 'sourceFile',
      filePath: require.resolve('tslib/tslib.js'),
    };
  }

  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
