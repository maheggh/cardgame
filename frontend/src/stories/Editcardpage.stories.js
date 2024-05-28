import React from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import EditCardPage from '../../src/pages/EditCardPage/index';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { getSingleCard, updateCard, deleteCard } from '../../src/API/cards';
import jest from 'jest-mock';

// Manual mock implementations of the API functions
const mockGetSingleCard = jest.fn();
const mockUpdateCard = jest.fn();
const mockDeleteCard = jest.fn();

jest.mock('../../src/API/cards', () => ({
  getSingleCard: mockGetSingleCard,
  updateCard: mockUpdateCard,
  deleteCard: mockDeleteCard,
}));

// Mock data for the card
const mockCardData = {
  'card-id': '1',
  'card-type': 'type1',
  'card-category': 'category1',
  'card-name': 'Card Name',
  'card-description': 'Card Description',
  'card-details': 'Card Details',
};

// Mock implementations of the API functions
mockGetSingleCard.mockResolvedValue(mockCardData);
mockUpdateCard.mockResolvedValue(mockCardData);
mockDeleteCard.mockResolvedValue({});

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
    // Provide default args if needed
  },
};

const Template = (args) => <EditCardPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args for the EditCardPage component if any
};

// Example of an interaction test
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
