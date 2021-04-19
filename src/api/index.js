const GitHubApi = {
  search(username, page) {
    console.info("Searching on GitHub API", username, page);

    return Promise.resolve({
      totalItems: 14,
      currentPage: page,
      totalPages: 2,
      items: [
        {
          id: 5459296,
          login: "dariodjuric",
          followers: 5,
          avatarUrl: "https://avatars.githubusercontent.com/u/5459296?v=4",
          bio: "Full-stack software engineer",
          apiPageUrl: "https://api.github.com/users/dariodjuric",
        },
      ],
    });
  },
};

export default GitHubApi;
