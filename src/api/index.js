import { GraphQLClient, gql } from 'graphql-request';

const GET_USERS = gql`
  query getUsers(
    $query: String!
    $first: Int
    $last: Int
    $afterCursor: String
    $beforeCursor: String
  ) {
    search(
      query: $query
      type: USER
      first: $first
      last: $last
      after: $afterCursor
      before: $beforeCursor
    ) {
      userCount
      edges {
        node {
          ... on User {
            id
            login
            avatarUrl
            bio
            followers {
              totalCount
            }
            starredRepositories {
              totalCount
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const PAGE_SIZE = 5;

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const GitHubApi = {
  searchNextUsers(query, afterCursor) {
    return this.searchUsers(query, afterCursor, null, PAGE_SIZE, null);
  },

  searchPreviousUsers(query, beforeCursor) {
    return this.searchUsers(query, null, beforeCursor, null, PAGE_SIZE);
  },

  searchUsers(query, afterCursor, beforeCursor, first, last) {
    return client
      .request(GET_USERS, {
        query: query,
        afterCursor: afterCursor,
        beforeCursor: beforeCursor,
        first: first,
        last: last,
      })
      .then((data) => {
        return {
          users: data.search.edges.map((edge) => {
            const node = edge.node;
            return {
              id: node.id,
              login: node.login,
              followers: node.followers ? node.followers.totalCount : null,
              starred: node.starredRepositories
                ? node.starredRepositories.totalCount
                : null,
              avatarUrl: node.avatarUrl,
              bio: node.bio,
              apiPageUrl: `https://api.github.com/users/${node.login}`,
            };
          }),
          totalCount: data.search.userCount,
          pageInfo: data.search.pageInfo,
        };
      });
  },
};

export default GitHubApi;
