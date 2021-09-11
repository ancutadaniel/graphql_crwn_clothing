import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
  {
    collections {
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

const CollectionsOverviewContainer = () => {
  return (
    <Query query={GET_COLLECTIONS}>
      {(response) => {
        const { loading, data } = response;

        if (loading || data === undefined) return <Spinner />;

        if (data !== undefined) {
          return <CollectionsOverview collections={data.collections} />;
        }
      }}
    </Query>
  );
};

export default CollectionsOverviewContainer;
