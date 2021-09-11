import React from 'react';
import { Mutation, Query } from '@apollo/react-components';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CartIcon from './cart-icon.component';

// step 1 calling the mutation defined in our type (typeDefs)
// step 2 we get back the toggleHidden mutation write in our resolver
const TOGGLE_HIDDEN = gql`
  mutation ToggleHidden {
    toggleHidden @client
  }
`;

const COUNT_ITEMS = gql`
  {
    countItems @client
  }
`;

// step 3 we pass the mutation in the component

// const CartItemContainer = () => (
//   <Mutation mutation={TOGGLE_HIDDEN}>
//     {(toggleHidden) => (
//       <Query query={COUNT_ITEMS}>
//         {({ data: { countItems } }) => {
//           return (
//             <CartIcon toggleCartHidden={toggleHidden} itemCount={countItems} />
//           );
//         }}
//       </Query>
//     )}
//   </Mutation>
// );

// different approach similar to connect - redux
const CartItemContainer = (props) => {
  const { countItems } = props.data;
  const { toggleHidden } = props;
  return <CartIcon toggleCartHidden={toggleHidden} itemCount={countItems} />;
};

export default flowRight(
  graphql(COUNT_ITEMS),
  graphql(TOGGLE_HIDDEN, { name: 'toggleHidden' })
)(CartItemContainer);
