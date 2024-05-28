import React from 'react';
import Welcome from '../../src/pages/welcome/index';

export default {
  title: 'Example/Welcome',
  component: Welcome,
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

const Template = (args) => <Welcome {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args for the Welcome component if any
};
