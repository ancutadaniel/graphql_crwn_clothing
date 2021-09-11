import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

// graphql & apollo
import { ApolloProvider } from '@apollo/react-common';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { resolvers, typeDefs } from './graphql/resolvers';

import './index.css';
import App from './App';

// step 1 create link
const link = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

//step 2 create cache
const cache = new InMemoryCache();

// step 3 create client
const client = new ApolloClient({ link, cache, resolvers, typeDefs });

// step 4 test the client -  gql
// client
//   .query({
//     query: gql`
//       {
//         collections {
//           id
//           title
//           items {
//             id
//             name
//             price
//             imageUrl
//           }
//         }
//       }
//     `,
//   })
//   .then((response) => console.log('app gql', response));

// step 5 => cache is like localState
client.writeData({
  data: {
    hidden: true,
    cartItems: [],
    countItems: 0,
    total: 0,
  },
});

// step 6 create a folder for mutation (graphql)
// step 7 import resolvers, typeDef from graphql and pass to the ApolloClient

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
