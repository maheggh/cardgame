import React from 'react';
import Game from '../../src/pages/game'; // Correct path

export default {
  title: 'Example/Game',
  component: Game,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Define argTypes if necessary
  },
  args: {
    // Provide default args if needed
  },
};

const Template = (args) => <Game {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args for the Game component if any
};

// Example of an interaction test
export const GamePlay = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const startButton = canvas.getByRole('button', { name: /Start Game/i });
    await expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await expect(canvas.getByText(/Player's Turn/i)).toBeInTheDocument();
  },
};
