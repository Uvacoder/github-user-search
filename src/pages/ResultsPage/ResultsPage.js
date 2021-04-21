import React from "react";
import { useParams } from "react-router";
import GitHubApi from "../../api";
import { Button, Container, Message } from "semantic-ui-react";
import { Item } from "./Item";

export function ResultsPage() {
  const { username } = useParams();

  const [items, setItems] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [pageInfo, setPageInfo] = React.useState({});

  const saveState = (result) => {
    setTotalCount(result.totalCount);
    setItems(result.users);
    setPageInfo(result.pageInfo);
  };

  const handleError = (error) => {
    setErrorMessage(error.toString());
  };

  React.useEffect(() => {
    GitHubApi.fetchNextPage(username).then(saveState).catch(handleError);
  }, [username]);

  const handleNextPage = () => {
    GitHubApi.fetchNextPage(username, pageInfo.endCursor)
      .then(saveState)
      .catch(handleError);
  };

  const handlePreviousPage = () => {
    GitHubApi.fetchPreviousPage(username, pageInfo.startCursor)
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
          disabled={!pageInfo.hasPreviousPage}
          primary
          onClick={handlePreviousPage}
        >
          Previous Page
        </Button>
        <Button
          disabled={!pageInfo.hasNextPage}
          primary
          onClick={handleNextPage}
        >
          Next Page
        </Button>
      </Container>
    </Container>
  );
}
