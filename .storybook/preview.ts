import type { Preview } from '@storybook/sveltekit';

import "../src/lib/styles/main.css";
import "../src/lib/styles/theme.css";

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: {
       date: /Date$/i,
      },
    },
  },
};

export default preview;