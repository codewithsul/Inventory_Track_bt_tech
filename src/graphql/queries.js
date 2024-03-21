/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStock = /* GraphQL */ `
  query getStock($id: ID!) {
    getStock(id: $id) {
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
export const listStock = /* GraphQL */ `
  query listStock(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStock(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        item_name
        item_description
        category
        unit_cost
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
