import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page title', () => {
  render(<App />);
  const title = screen.getByText(/Sign in to Minimal Todo/i);
  expect(title).toBeInTheDocument();
});
