import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

import CheckoutPage from './checkout.component';

// get data from cache(localState)
const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    total @client
  }
`;

const CheckoutPageContainer = () => (
  <Query query={GET_CART_ITEMS_AND_TOTAL}>
    {({ data: { cartItems, total } }) => {
      return <CheckoutPage cartItems={cartItems} total={total} />;
    }}
  </Query>
);

export default CheckoutPageContainer;
