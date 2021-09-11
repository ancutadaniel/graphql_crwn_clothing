import React from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { gql } from 'apollo-boost';

import CartDropdown from './cart-dropdown.component';

// step 1 call the mutations defined in typeDefs
// step 2 we get back the toggleHidden mutation write in resolvers
const TOGGLE_HIDDEN = gql`
  mutation ToggleHidden {
    toggleHidden @client
  }
`;

// get data from cache(localState)
const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

// step 3 we pass the mutation in component and the data from the cache(localState)
const CartDropdownContainer = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data: { cartItems } }) => (
      <Mutation mutation={TOGGLE_HIDDEN}>
        {(toggleHidden) => (
          <CartDropdown toggleCartHidden={toggleHidden} cartItems={cartItems} />
        )}
      </Mutation>
    )}
  </Query>
);

export default CartDropdownContainer;
