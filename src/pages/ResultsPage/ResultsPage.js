import React from "react";
import { useParams } from "react-router";
import GitHubApi from "../../api";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Image,
  Message,
} from "semantic-ui-react";

function Item({ login, followers, starred, avatarUrl, bio, apiPageUrl }) {
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
            <Icon disabled name="user" /> {followers}{" "}
            <Icon disabled name="star" /> {starred}
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
  const [endCursor, setEndCursor] = React.useState(null);
  const [startCursor, setStartCursor] = React.useState(null);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [hasPreviousPage, setHasPreviousPage] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const saveState = (result) => {
    setEndCursor(result.endCursor);
    setStartCursor(result.startCursor);
    setHasNextPage(result.hasNextPage);
    setHasPreviousPage(result.hasPreviousPage);
    setTotalCount(result.totalCount);
    setItems(result.users);
  };

  const handleError = (error) => {
    setErrorMessage(error.toString());
  };

  React.useEffect(() => {
    GitHubApi.fetchNextPage(username).then(saveState).catch(handleError);
  }, [username]);

  const handleNextPage = () => {
    GitHubApi.fetchNextPage(username, endCursor)
      .then(saveState)
      .catch(handleError);
  };

  const handlePreviousPage = () => {
    GitHubApi.fetchPreviousPage(username, startCursor)
      .then(saveState)
      .catch(handleError);
  };

  if (errorMessage) {
    return (
      <Message negative>
        <Message.Header>Error fetching data</Message.Header>
        <p>{errorMessage}</p>
      </Message>
    );
  }

  return (
    <Container style={{ padding: "3rem" }}>
      <Container>
        <b>{totalCount} users</b>
      </Container>
      <Container>
        {items.map((record) => (
          <Item key={record.id} {...record} />
        ))}
      </Container>
      <Container textAlign="center">
        <Button
          disabled={!hasPreviousPage}
          primary
          onClick={handlePreviousPage}
        >
          Previous Page
        </Button>
        <Button disabled={!hasNextPage} primary onClick={handleNextPage}>
          Next Page
        </Button>
      </Container>
    </Container>
  );
}
