import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export function InputPage() {
  const [username, setUsername] = React.useState('');
  const history = useHistory();

  const handleChange = (e, { value }) => {
    setUsername(value);
  };

  const handleSubmit = () => {
    history.push(`/${encodeURIComponent(username)}`);
  };

  return (
    <Container textAlign="center">
      <Form onSubmit={handleSubmit}>
        <Form.Input
          style={{ width: '40%', paddingTop: '10%' }}
          placeholder="Search users..."
          onChange={handleChange}
          value={username}
        />

        <button className="ui primary button" type="submit">
          Search
        </button>
      </Form>
    </Container>
  );
}
