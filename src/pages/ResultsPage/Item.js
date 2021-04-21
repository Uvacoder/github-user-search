import { Divider, Grid, Icon, Image } from 'semantic-ui-react';
import React from 'react';

export function Item({
  login,
  followers,
  starred,
  avatarUrl,
  bio,
  apiPageUrl,
}) {
  return (
    <>
      <Divider />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src={avatarUrl} style={{ width: '70px', height: '70px' }} />
          </Grid.Column>
          <Grid.Column width={14}>
            <b>
              <a href={apiPageUrl}>{login}</a>
            </b>
            <br />
            {bio}
            <br />
            <Icon disabled name="user" /> {followers}{' '}
            <Icon disabled name="star" /> {starred}
            <br />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </>
  );
}
