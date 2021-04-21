import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputPage } from './InputPage';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';

describe('InputPage', () => {
  test('renders InputPage component', async () => {
    render(<InputPage />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('routes to results page on search submission', async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    render(
      <Router history={historyMock}>
        <InputPage />
      </Router>
    );

    const testQuery = 'test string';
    await userEvent.type(screen.getByRole('textbox'), testQuery);
    await userEvent.click(screen.getByRole('button'));

    expect(historyMock.push.mock.calls[0][0]).toEqual(
      `/${encodeURIComponent(testQuery)}`
    );
  });
});
