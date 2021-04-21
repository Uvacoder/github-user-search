import { Message } from 'semantic-ui-react';

export function ErrorMessage({ message }) {
  return (
    <Message negative>
      <Message.Header>Error fetching data</Message.Header>
      <p>{message}</p>
    </Message>
  );
}
