import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultsPage } from './ResultsPage';
import { MemoryRouter, Route } from 'react-router-dom';
import GitHubApi from '../../api';
import { when } from 'jest-when';
import userEvent from '@testing-library/user-event';

function mockApiResponse(users, hasNextPage, hasPreviousPage, total) {
  return {
    users: users,
    totalCount: total,
    pageInfo: {
      startCursor: users[0].cursor,
      endCursor: users[users.length - 1].cursor,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
    },
  };
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('ResultsPage', () => {
  test('renders results after initial search', async () => {
    GitHubApi.searchNextUsers = jest.fn();
    when(GitHubApi.searchNextUsers)
      .calledWith('test')
      .mockResolvedValue(
        mockApiResponse(
          [
            { id: 1, login: 'user1', cursor: 'cur1' },
            { id: 2, login: 'user2', cursor: 'cur2' },
          ],
          false,
          false,
          2
        )
      );

    render(
      <MemoryRouter initialEntries={['/test']}>
        <Route path="/:username">
          <ResultsPage />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText('2 users')).toBeInTheDocument();
    expect(await screen.findByText('user1')).toBeInTheDocument();
    expect(await screen.findByText('user2')).toBeInTheDocument();
    expect(await screen.findByText('Previous Page')).toHaveClass('disabled');
    expect(await screen.findByText('Next Page')).toHaveClass('disabled');
  });

  test('renders next page after button is clicked', async () => {
    GitHubApi.searchNextUsers = jest.fn();
    when(GitHubApi.searchNextUsers)
      .calledWith('test')
      .mockResolvedValue(
        mockApiResponse(
          [
            { id: 1, login: 'user1', cursor: 'cur1' },
            { id: 2, login: 'user2', cursor: 'cur2' },
          ],
          true,
          false,
          4
        )
      );

    when(GitHubApi.searchNextUsers)
      .calledWith('test', 'cur2')
      .mockResolvedValue(
        mockApiResponse(
          [
            { id: 3, login: 'user3', cursor: 'cur3' },
            { id: 4, login: 'user4', cursor: 'cur4' },
          ],
          false,
          true,
          4
        )
      );

    render(
      <MemoryRouter initialEntries={['/test']}>
        <Route path="/:username">
          <ResultsPage />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText('4 users')).toBeInTheDocument();

    userEvent.click(await screen.findByText('Next Page'));

    expect(await screen.findByText('user3')).toBeInTheDocument();
    expect(await screen.findByText('user4')).toBeInTheDocument();

    expect(await screen.findByText('Previous Page')).not.toHaveClass(
      'disabled'
    );
    expect(await screen.findByText('Next Page')).toHaveClass('disabled');
  });

  test('renders previous page after button is clicked', async () => {
    const firstPageMock = mockApiResponse(
      [
        { id: 1, login: 'user1', cursor: 'cur1' },
        { id: 2, login: 'user2', cursor: 'cur2' },
      ],
      true,
      false,
      4
    );

    GitHubApi.searchNextUsers = jest.fn();
    GitHubApi.searchPreviousUsers = jest.fn();
    when(GitHubApi.searchNextUsers)
      .calledWith('test')
      .mockResolvedValue(firstPageMock);

    when(GitHubApi.searchNextUsers)
      .calledWith('test', 'cur2')
      .mockResolvedValue(
        mockApiResponse(
          [
            { id: 3, login: 'user3', cursor: 'cur3' },
            { id: 4, login: 'user4', cursor: 'cur4' },
          ],
          false,
          true,
          4
        )
      );

    when(GitHubApi.searchPreviousUsers)
      .calledWith('test', 'cur3')
      .mockResolvedValue(firstPageMock);

    render(
      <MemoryRouter initialEntries={['/test']}>
        <Route path="/:username">
          <ResultsPage />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText('4 users')).toBeInTheDocument();

    userEvent.click(await screen.findByText('Next Page'));

    expect(await screen.findByText('user3')).toBeInTheDocument();

    userEvent.click(await screen.findByText('Previous Page'));

    expect(await screen.findByText('user1')).toBeInTheDocument();
  });
});
