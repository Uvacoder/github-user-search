import React from 'react';
import { useParams } from 'react-router';
import GitHubApi from '../../api';
import { Container } from 'semantic-ui-react';
import { Item } from './Item';
import { Pagination } from './Pagination';
import { ErrorMessage } from './ErrorMessage';
import { LoadingIndicator } from './LoadingIndicator';

export function ResultsPage() {
  const { username } = useParams();

  const [items, setItems] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [pageInfo, setPageInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const saveState = (result) => {
    setTotalCount(result.totalCount);
    setItems(result.users);
    setPageInfo(result.pageInfo);
    setLoading(false);
  };

  const handleError = (error) => {
    setErrorMessage(error.toString());
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    GitHubApi.searchNextUsers(username).then(saveState).catch(handleError);
  }, [username]);

  const handleNextPageClick = () => {
    setLoading(true);
    GitHubApi.searchNextUsers(username, pageInfo.endCursor)
      .then(saveState)
      .catch(handleError);
  };

  const handlePreviousPageClick = () => {
    setLoading(true);
    GitHubApi.searchPreviousUsers(username, pageInfo.startCursor)
      .then(saveState)
      .catch(handleError);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <Container style={{ padding: '3rem' }}>
      <Container>
        <b>{totalCount} users</b>
      </Container>
      <Container>
        {items.map((record) => (
          <Item key={record.id} {...record} />
        ))}
      </Container>
      <Container textAlign="center">
        <Pagination
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
          onNextPageClick={handleNextPageClick}
          onPreviousPageClick={handlePreviousPageClick}
        />
      </Container>
    </Container>
  );
}
