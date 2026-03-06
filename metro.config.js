const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Fix: "Cannot destructure property '__extends' of 'tslib.default' as it is undefined"
// Moti (and other packages) import tslib helpers. On web, Metro resolves the ESM
// entry point where `tslib.default` is undefined. Force Metro to use the CJS version.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Redirect tslib to its CJS entry on web
  if (moduleName === 'tslib' && platform === 'web') {
    return {
      type: 'sourceFile',
      filePath: require.resolve('tslib/tslib.js'),
    };
  }

  // Fall back to default resolution
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
