/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listStock = /* GraphQL */ `
  query ListStock {
    listStock {
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
export const getStock = /* GraphQL */ `
  query GetStock($id: ID!) {
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
export const listStocks = /* GraphQL */ `
  query ListStocks(
    $filter: ModelStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
