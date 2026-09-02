import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import '../packages/design-system/src/styles/global.css';
import '../packages/elements/src/styles.css';
import './custom.css';
import { registerAllElements } from '../packages/elements/src/index';

if (typeof window !== 'undefined') {
  registerAllElements();
}

const withTheme = (Story, context) => {
  const theme = context.globals.theme || 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Also update Storybook's docs background
    const docsStory = document.querySelector('.docs-story');
    if (docsStory) {
      docsStory.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div
      data-theme={theme}
      style={{
        backgroundColor: theme === 'dark' ? '#171717' : '#ffffff',
        minHeight: '100%',
        padding: '1rem',
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Components', 'Web Components'],
        locales: 'en-US',
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      disable: true, // Disable since we're handling it with theme
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      toc: false,
    },
  },
};

export default preview;
