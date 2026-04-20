import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';

const COMPONENTS_ROOT = path.resolve(__dirname, '..');

const findComponentFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return findComponentFiles(fullPath);
    }

    if (
      entry.isFile() &&
      entry.name.endsWith('.tsx') &&
      !entry.name.endsWith('.test.tsx') &&
      !fullPath.includes(`${path.sep}__tests__${path.sep}`)
    ) {
      return [fullPath];
    }

    return [];
  });

const componentFiles = findComponentFiles(COMPONENTS_ROOT).sort();

describe('components smoke test coverage', () => {
  it('discovers every component file in src/components', () => {
    expect(componentFiles.length).toBe(107);
  });

  it.each(componentFiles)('%s renders without crashing', (filePath) => {
    const exportName = path.basename(filePath, '.tsx');
    const moduleExports = require(filePath);
    const Component = moduleExports[exportName];

    expect(Component).toBeDefined();

    const result = renderComponent(filePath, Component);
    result.unmount();
  });
});
