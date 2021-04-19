import React from "react";
import { useParams } from "react-router";
import GitHubApi from "../../api";
import { Container, Divider, Grid, Image, Pagination } from "semantic-ui-react";

function Item({ login, followers, avatarUrl, bio, apiPageUrl }) {
  return (
    <>
      <Divider />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src={avatarUrl} style={{ width: "70px", height: "70px" }} />
          </Grid.Column>
          <Grid.Column width={14}>
            <b>
              <a href={apiPageUrl}>{login}</a>
            </b>
            <br />
            {bio}
            <br />
            Followers: {followers}
            <br />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </>
  );
}

export function ResultsPage() {
  const { username } = useParams();

  const [items, setItems] = React.useState([]);
  const [itemCount, setItemCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    console.info("effect");
    GitHubApi.search(username, page).then((result) => {
      setItemCount(result.totalItems);
      setItems(result.items);
      setPage(result.currentPage);
      setTotalPages(result.totalPages);
    });
  }, [username, page]);

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage);
  };

  return (
    <Container style={{ padding: "3rem" }}>
      <Container>
        <b>{itemCount} users</b>
      </Container>
      <Container>
        {items.map((record) => (
          <Item
            key={record.id}
            login={record.login}
            followers={record.followers}
            avatarUrl={record.avatarUrl}
            bio={record.bio}
            apiPageUrl={record.apiPageUrl}
          />
        ))}
      </Container>
      <Container textAlign="center">
        <Pagination
          defaultActivePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </Container>
  );
}
