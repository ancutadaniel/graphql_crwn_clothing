import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

import Header from './header.component';

const GET_CART_HIDDEN = gql`
  {
    hidden @client
  }
`;

const HeaderContainer = () => (
  <Query query={GET_CART_HIDDEN}>
    {(response) => {
      const { hidden } = response.data;
      return <Header hidden={hidden} />;
    }}
  </Query>
);

export default HeaderContainer;
