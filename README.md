# GitHub User Search

This project resembles the [GitHub Search](https://github.com/search) functionality of GitHub, but for users.

## Design Decisions

* This project uses both v3 (REST) and v4 (GraphQL).
  * GraphQL was used to be able to retrieve user attributes such as follower count in a single query. If we were to use REST, we would need to use multiple queries to display this information immediately under search results.
  * REST was used to display user information upon clicking a search result, since it provides a nice & quick way to display all relevant information. 
* [Semantic UI](https://semantic-ui.com/) was used for visuals, since the looks of this library is quite close to GitHub's design.
