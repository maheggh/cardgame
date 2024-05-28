import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Optional: Extend Jest's `expect` to have more assertions
expect.extend({
  // Add custom matchers if needed
});

// Configure @testing-library/react
configure({
  // Add any global configuration options for testing library
});

// Global mock for Jest
global.jest = require('jest-mock');
