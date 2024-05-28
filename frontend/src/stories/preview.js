// Import global CSS files
import '../src/app.css'; // Ensure this path is correct
import '../src/pages/welcome/style.css'; // Ensure this path is correct

// You can add global decorators here if necessary
export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
];
