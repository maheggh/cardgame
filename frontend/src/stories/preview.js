// Import global CSS files
import '../src/app.css';
import '../src/pages/welcome/style.css';

// Import Jest setup file
import '../stories/setupTests';

export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
];