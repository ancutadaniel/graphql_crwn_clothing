import { gql } from 'apollo-boost';

import {
  addItemToCart,
  removeItemFromCart,
  clearItem,
  getCartQuantity,
  getTotalPrice,
} from './cart.utils';

// schemas
// ToggleHidden - is capitalized because is type definition
// extent type Item we extend type from server
export const typeDefs = gql`
  extend type Mutation {
    ToggleHidden: Boolean!
    AddItem(item: Item!): [Item]
    RemoveItem(item: Item!): [Item]
    ClearItem(item: Item!): [Item]
  }

  extend type Item {
    quantity: Int
  }
`;

// read from the cache(localState for apollo)
// @client we specify that this hidden props is on client side
const GET_CART_HIDDEN = gql`
  {
    hidden @client
  }
`;

const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    total @client
  }
`;

const GET_COUNT_ITEMS = gql`
  {
    countItems @client
  }
`;

// toggleHidden - mutation definition
// a mutation is a function with 4 arguments
export const resolvers = {
  Mutation: {
    toggleHidden: (_root, _args, _context, _info) => {
      const { cache } = _context;

      // get data from cache(localState)
      const { hidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      // update data on the cache
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { hidden: !hidden },
      });

      // we return the opposite value
      return !hidden;
    },

    addItem: (_root, _args, _context, _info) => {
      const { item } = _args;
      const { cache } = _context;

      // get data from cache(localState)
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
      });

      // new cartItems
      const newCartItems = addItemToCart(cartItems, item);

      // update item count
      cache.writeQuery({
        query: GET_COUNT_ITEMS,
        data: { countItems: getCartQuantity(newCartItems) },
      });

      // update total price
      cache.writeQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
        data: { total: getTotalPrice(newCartItems) },
      });

      // update data on the cache
      cache.writeQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },

    removeItem: (_root, _args, _context, _info) => {
      const { item } = _args;
      const { cache } = _context;

      // get data from cache(localState)
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
      });

      const newCartItems = removeItemFromCart(cartItems, item);

      // update item count
      cache.writeQuery({
        query: GET_COUNT_ITEMS,
        data: { countItems: getCartQuantity(newCartItems) },
      });

      // update total price
      cache.writeQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
        data: { total: getTotalPrice(newCartItems) },
      });

      // update data on the cache
      cache.writeQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },

    clearItem: (_root, _args, _context, _info) => {
      const { item } = _args;
      const { cache } = _context;

      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
      });

      const newCartItems = clearItem(cartItems, item);

      // update item count
      cache.writeQuery({
        query: GET_COUNT_ITEMS,
        data: { countItems: getCartQuantity(newCartItems) },
      });

      // update total price
      cache.writeQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
        data: { total: getTotalPrice(newCartItems) },
      });

      // update data on the cache
      cache.writeQuery({
        query: GET_CART_ITEMS_AND_TOTAL,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },
  },
};
