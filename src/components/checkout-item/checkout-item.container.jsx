import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CheckoutItem from './checkout-item.component';

// step 1 - call mutation from typeDefs resolvers
// step 2 - we get back the mutation addItem from our resolver
const ADD_ITEM = gql`
  mutation AddItem($item: Item!) {
    addItem(item: $item) @client
  }
`;
const REMOVE_ITEM = gql`
  mutation RemoveItem($item: Item!) {
    removeItem(item: $item) @client
  }
`;

const CLEAR_ITEM = gql`
  mutation ClearItem($item: Item!) {
    clearItem(item: $item) @client
  }
`;

const CheckoutItemContainer = (props) => {
  const { addItem, removeItem, clearItem } = props;
  return (
    <CheckoutItem
      {...props}
      addItem={(item) => addItem({ variables: { item } })}
      removeItem={(item) => removeItem({ variables: { item } })}
      clearItem={(item) => clearItem({ variables: { item } })}
    />
  );
};

export default flowRight(
  graphql(ADD_ITEM, { name: 'addItem' }),
  graphql(REMOVE_ITEM, { name: 'removeItem' }),
  graphql(CLEAR_ITEM, { name: 'clearItem' })
)(CheckoutItemContainer);
