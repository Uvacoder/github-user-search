import { Dimmer, Loader } from 'semantic-ui-react';
import React from 'react';

export function LoadingIndicator() {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
}
