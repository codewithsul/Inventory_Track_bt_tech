import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { generateClient as apiClientGenerator } from "aws-amplify/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listStock } from "./graphql/queries";
import {
  createStock as createStockMutation,
  deleteStock as deleteStockMutation,
} from "./graphql/mutations";

const apiClient = apiClientGenerator();

// const initialformValues = {
//   item_name: "",
//   item_description: "",
//   categoty: "",
//   unit_cost: "",
// };

const App = ({ signOut }) => {
  const [Stock, setStock] = useState([]);

  //state for controlling add inventory visibility
  const [addInventory, setAddInvetory] = useState(false);
  const { inventoryState } = addInventory;

  // //state for saving values entered on form
  // const [formValues, setFormValues] = useState(initialformValues);
  // const { item_name, item_description, category, unit_cost } = formValues;

  useEffect(() => {
    fetchStock();
  }, []);

  //function for setting setAddinventory to true
  const ExpandInventoryField = () => {
    setAddInvetory(!addInventory);
  };

  // //funtion for fetching all selected inputs from add_inventory form
  // const handleChangeInventoryForm = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // console.log("formvalues:", formValues);

  const fetchStock = async () => {
    const apiData = await apiClient.graphql({ query: listStock });
    const StockFromAPI = apiData.data.listStock.items;
    setStock(StockFromAPI);
  };

  const createStock = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      item_name: form.get("item_name"),
      item_description: form.get("item_description"),
      category: form.get("category"),
      unit_cost: form.get("unit_cost"),
    };
    await apiClient.graphql({
      query: createStockMutation,
      variables: { input: data },
    });
    fetchStock();
    event.target.reset();
  };

  const deleteStock = async ({ id }) => {
    const newStock = Stock.filter((stock) => stock.id !== id);
    setStock(newStock);
    await apiClient.graphql({
      query: deleteStockMutation,
      variables: { input: { id } },
    });
  };

  return (
    <View className="App">
      <View className="NavBar">
        <View className="LeftButtonBlock">
          <h2>Invetory</h2>
          <label id="dashboard">DashBoard</label>
        </View>
      </View>
      <View className="button_block">
        <View className="ButtonBlock">
          <input
            type="button"
            value={addInventory ? "Close" : "Add Inventory"}
            name="add_inventory"
            id="inventory_button"
            onClick={ExpandInventoryField}
          />
        </View>
      </View>
      {addInventory && (
        <View className="inventory_add_field" onSubmit={createStock}>
          <View className="Field">
            <label htmlFor="item_name">Item name :</label>
            <input
              type="text"
              name="item_name"
              id="item"
              placeholder="Item name"
            />
          </View>
          <View className="Field">
            <label htmlFor="item_description">Item description :</label>
            <input
              type="text"
              name="item_description"
              id="item_description"
              placeholder="Item description"
            />
          </View>
          <View className="Field">
            <label htmlFor="item_description">Category :</label>
            <select className="select_category" name="category">
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Office supplies">Office supplies</option>
              <option value="Stationary">Stationary</option>
              <option value="Furnitures">Furnitures</option>
              <option value="Appliances">Appliances</option>
              <option value="Tools and Equipments supplies">
                Tools and Equipments
              </option>
              <option value="Home and Garden">Home and Garden</option>
              <option value="Fitness">Fitness</option>
              <option value="Toys and Games">Toys and Games</option>
              <option value="Health and Beauty">Health and Beauty</option>
              <option value="Books and Magazines">Books and Magazines</option>
            </select>
          </View>
          <View className="Field">
            <label htmlFor="unit_cost">Unit cost :</label>
            <input
              type="text"
              name="unit_cost"
              id="unit_cost"
              placeholder="Unit cost"
            />
          </View>
          <input
            type="submit"
            name="save_button"
            value="Save"
            id="save_button"
          />
        </View>
      )}
      <View className="InventoryTable">
        <table className="Inventory_table">
          <thead>
            <tr>
              <th>No</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Category</th>
              <th>Unit Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Stock.map((stock, index) => {
              return (
                <tr key={stock.id}>
                  <td>{index + 1}</td>
                  <td>{stock.item_name}</td>
                  <td>{stock.iten_description}</td>
                  <td>{stock.category}</td>
                  <td>{stock.unit_cost}</td>
                  <td>
                    <label>
                      <button className="btn btn-edit">
                        <FaEdit />
                      </button>
                    </label>
                    <button
                      className="btn btn-delete"
                      variation="link"
                      onClick={() => deleteStock(stock)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </View>
    </View>
  );
};

export default withAuthenticator(App);
