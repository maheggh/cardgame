import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EditCardPage from '../../src/pages/EditCardPage/index';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { mockGetSingleCard, mockUpdateCard, mockDeleteCard } from './mocks';

export default {
  title: 'Example/EditCardPage',
  component: EditCardPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/edit-card/1']}>
        <Routes>
          <Route path="/edit-card/:cardId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    // Define argTypes if necessary
  },
  args: {
    getSingleCard: mockGetSingleCard,
    updateCard: mockUpdateCard,
    deleteCard: mockDeleteCard,
  },
};

const Template = (args) => <EditCardPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args for the EditCardPage component if any
};

export const InteractionTest = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByLabelText(/Name/i);
    await expect(nameInput).toBeInTheDocument();
    await userEvent.type(nameInput, 'Updated Card Name');
    const saveButton = canvas.getByRole('button', { name: /Save/i });
    await userEvent.click(saveButton);
    await expect(mockUpdateCard).toHaveBeenCalled();
  },
};
