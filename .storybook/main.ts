import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../.storybook/welcome.mdx',
    '../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/elements/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      viteConfigPath: '.storybook/vite.config.ts',
    },
  },
  viteFinal: async (config) => {
    config.define = {
      ...config.define,
      'process.env': {},
      process: { env: {} },
    };
    return config;
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['../public'],
  managerHead: (head) => `
    ${head}
    <title>A11Y Pros Accessible Design System</title>
    <meta name="description" content="Accessibility-first React UI component library - WCAG 2.1/2.2 compliant components" />
  `,
  // Base path is configured in vite.config.ts to use /storybook-static/
  // This ensures assets use absolute paths that match where files are located
};

export default config;
