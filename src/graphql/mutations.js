/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStock = /* GraphQL */ `
  mutation createStock(
    $input: CreateStockInput!
    $condition: ModelStockConditionInput
  ) {
    createStock(input: $input, condition: $condition) {
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
export const updateStock = /* GraphQL */ `
  mutation updateStock(
    $input: UpdateStockInput!
    $condition: ModelNoteConditionInput
  ) {
    updateStock(input: $input, condition: $condition) {
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
export const deleteStock = /* GraphQL */ `
  mutation DeleteStock(
    $input: DeleteStockInput!
    $condition: ModelStockConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
