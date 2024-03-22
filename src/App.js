import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { generateClient as apiClientGenerator } from "aws-amplify/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import { listStocks, getStock } from "./graphql/queries";
import {
  createStock as createStockMutation,
  deleteStock as deleteStockMutation,
  updateStock as updateStockMutation,
} from "./graphql/mutations";

const initialData = {
  item_name: "",
  item_description: "",
  categoty: "",
  unit_cost: "",
};

const apiClient = apiClientGenerator();

const App = ({ signOut }) => {
  const [Stock, setStock] = useState([]);

  const totalStock = Stock.length;

  const [Alert, setAlert] = useState("");

  const [unit, setUnit] = useState("");

  async function status() {
    if (Stock.length < 6) {
      setAlert("Low stock");
    } else {
      setAlert("Good");
    }
  }

  useEffect(() => {
    status();
  }, [Stock]);

  async function units() {
    if (Stock.length < 2) {
      setUnit("unit");
    } else {
      setUnit("units");
    }
  }

  useEffect(() => {
    units();
  }, [Stock]);

  //state for managing inventory data
  const [InventoryData, setInventoryData] = useState(initialData);
  const { item_name, item_description, category, unit_cost } = InventoryData;

  const [values, setValues] = useState(initialData);

  console.log("inventory:", InventoryData);

  //state for controlling add inventory visibility
  const [addInventory, setAddInvetory] = useState(false);
  const { inventoryState } = addInventory;

  useEffect(() => {
    fetchStock();
  }, []);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;

    setInventoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //function for setting setAddinventory to true
  const ExpandInventoryField = () => {
    setAddInvetory(!addInventory);
  };

  //fetch stockdata on the specific id of the stock
  async function fetchStockOnId({ id }) {
    setAddInvetory(!addInventory);
    try {
      const apiData = await apiClient.graphql({
        query: getStock,
        variables: { id },
      });
      const stockItem = apiData.data.getStock;
      setInventoryData(stockItem);
      setValues(stockItem);
      return stockItem;
    } catch (error) {
      console.error("Error fetching stock item:", error);
      throw error;
    }
  }

  async function fetchStock() {
    const apiData = await apiClient.graphql({ query: listStocks });
    const StockFromAPI = apiData.data.listStocks.items;
    setStock(StockFromAPI);
  }

  const expenseEditId = values.id;

  async function createStock(event) {
    event.preventDefault();

    const data = {
      item_name,
      item_description,
      category,
      unit_cost,
    };

    if (!expenseEditId) {
      await apiClient.graphql({
        query: createStockMutation,
        variables: { input: data },
      });
    } else {
      await apiClient.graphql({
        query: updateStockMutation,
        variables: { input: { id: expenseEditId, ...data } },
      });
    }

    fetchStock(); // Fetch updated stock list
    setInventoryData(initialData); // Reset form fields
    event.target.reset();
  }

  async function deleteStock({ id }) {
    const newStock = Stock.filter((stock) => stock.id !== id);
    setStock(newStock);
    await apiClient.graphql({
      query: deleteStockMutation,
      variables: { input: { id } },
    });
  }

  console.log("stock:", Stock);

  return (
    <View className="App">
      <View className="NavBar">
        <View className="LeftButtonBlock">
          <h2>Invetory</h2>
          <label id="dashboard">DashBoard</label>
        </View>
        <View className="logOut">
          <Button onClick={signOut}>Sign Out</Button>
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
      <View className="total_stock">
        <label>Total stock : </label>
        {totalStock} {unit}
      </View>
      <View className="total_stock_alert">
        <label>Stock status : </label>
        {Alert}
      </View>
      {addInventory && (
        <View as="form" className="inventory_add_field" onSubmit={createStock}>
          <View className="Field">
            <label htmlFor="item_name">Item name :</label>
            <input
              type="text"
              name="item_name"
              id="item"
              placeholder="Item name"
              value={InventoryData.item_name || ""}
              onChange={handleExpenseChange}
            />
          </View>
          <View className="Field">
            <label htmlFor="item_description">Item description :</label>
            <input
              type="text"
              name="item_description"
              id="item_description"
              placeholder="Item description"
              value={InventoryData.item_description || ""}
              onChange={handleExpenseChange}
            />
          </View>
          <View className="Field">
            <label htmlFor="item_description">Category :</label>
            <select
              className="select_category"
              name="category"
              value={category || ""}
              onChange={handleExpenseChange}
            >
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
              value={InventoryData.unit_cost || ""}
              onChange={handleExpenseChange}
            />
          </View>
          <input
            type="submit"
            variation="primary"
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
                  <td>{stock.item_description}</td>
                  <td>{stock.category}</td>
                  <td>{stock.unit_cost}</td>
                  <td>
                    <label>
                      <button
                        className="btn btn-edit"
                        variation="link"
                        onClick={() => fetchStockOnId(stock)}
                      >
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
