import { StoryBookApp } from '../src/widgets/StoryBookApp/StoryBookApp';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <StoryBookApp>
      <Story />
    </StoryBookApp>
  ),
];
