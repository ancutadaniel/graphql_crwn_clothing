import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionContainer = ({ match }) => {
  return (
    <Query
      query={GET_COLLECTION_BY_TITLE}
      variables={{ title: match.params.collectionId }}
    >
      {(response) => {
        const { loading, data } = response;
        if (loading || data === undefined) return <Spinner />;

        const { getCollectionsByTitle } = data;

        if (data !== undefined) {
          return <CollectionPage collection={getCollectionsByTitle} />;
        }
      }}
    </Query>
  );
};

export default CollectionContainer;
