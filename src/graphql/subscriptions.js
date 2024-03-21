/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStock = /* GraphQL */ `
  subscription OnCreateStock($filter: ModelSubscriptionStockFilterInput) {
    onCreateStock(filter: $filter) {
      id
      item_name
      item_description
      category
      unit_cost
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStock = /* GraphQL */ `
  subscription OnUpdateStock($filter: ModelSubscriptionStockFilterInput) {
    onUpdateStock(filter: $filter) {
      id
      item_name
      item_description
      category
      unit_cost
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStock = /* GraphQL */ `
  subscription OnDeleteStock($filter: ModelSubscriptionStockFilterInput) {
    onDeleteStock(filter: $filter) {
      id
      item_name
      item_description
      category
      unit_cost
      createdAt
      updatedAt
      __typename
    }
  }
`;
