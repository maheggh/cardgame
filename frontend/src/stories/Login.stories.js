import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../src/components/PrivateRoute/UserContext'; 
import Login from '../../src/pages/login'; 

export default {
  title: 'Example/Login',
  component: Login,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    // Define argTypes if necessary
  },
  args: {
    // Provide default args if needed
  },
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args for the Login component if any
};

// Example of an interaction test
export const LoginProcess = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText(/Email/i);
    const passwordInput = canvas.getByLabelText(/Password/i);
    const loginButton = canvas.getByRole('button', { name: /Login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    await expect(loginButton).not.toBeInTheDocument();
  },
};
