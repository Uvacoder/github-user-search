# GitHub User Search

This is a React project that replicates the [GitHub Search](https://github.com/search) functionality of GitHub, but for users.

## Usage

To run locally, run `yarn install` first. Then run `yarn start`.

Tests are executed via `yarn test`.

To create final build, run `yarn build`.

## Development

### Design Decisions

* This project uses both v3 (REST) and v4 (GraphQL).
  * GraphQL was used to minimize the number of HTTP requests towards GitHub API. GraphQL allows retrieval of various attributes such as follower count in a single search query. If we were to use REST, we would need to use multiple queries to display this information under search results.
  * REST was used to display user information upon clicking a search result, since it provides a nice & quick way to display user data. 
* [Semantic UI](https://semantic-ui.com/) was used for visuals, since they are quite similar to GitHub's design.
* [GraphQL-Request](https://github.com/prisma-labs/graphql-request) was chosen as the GraphQL library, which is sufficient for a project of this size.

### Deployment

Deployment is done to Netlify using GitHub actions. It is performed on every push.
