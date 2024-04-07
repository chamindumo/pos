import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Usercss from "./user.css";
import removeIcon from "../Components/Assests/remove.png";

// Import Firebase configuration (assuming it's exported correctly from firebase.js)
import firebase from "../Components/Firebase/Firebase";
const firebaseConfig = firebase.firebaseConfig;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const User = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [itemList, setItemList] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [money, setMoney] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [changes, setChanges] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null); // Declare selectedItemId state

  useEffect(() => {
    // Fetch all items from Firestore
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllItems(items);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    // Calculate total price
    const total = itemList.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));

    // Calculate changes
    if (money !== "") {
      const moneyValue = parseFloat(money);
      const changesValue = (moneyValue - total).toFixed(2);
      setChanges(changesValue);
    }

    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    setDateTime(`${currentDate} ${currentTime}`);
  }, [itemList, money]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedItemId(item.id); // Set selectedItemId when an item is clicked
  };

  const handleAddToList = () => {
    if (selectedItem) {
      setItemList([...itemList, { ...selectedItem, quantity }]); // Include quantity
      setSelectedItem("");
      setSelectedItemId(null); // Reset selectedItemId when adding item to list
      setQuantity(1); // Reset quantity to 1
    }
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setItemList(updatedList);
  };

  const handleMoneyChange = (event) => {
    setMoney(event.target.value);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel? This action will clear all data."
    );
    if (confirmCancel) {
      setItemList([]);
      setMoney("");
      setChanges(0);
    }
  };

  const handlePrint = () => {
    if (window.confirm("Do you want to print the Invoice")) {
      const content = `
      <h1>ABC Grocery Store</h1>
      <h5>No.01, Galle Road, Kalutara</h5>
      <h6>Tel : 034 1234567</h6>
      <h3>Ordered Items:</h3>
      <table>
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      ${itemList
        .map(
          (item) => `
          <tr>
            <td>${item.itemname}</td>
            <td>${item.price}</td>
          </tr>
        `
        )
        .join("")}
    </tbody>
  </table>
      <p>Total Price: ${totalPrice}</p>
      <p>Money: ${money}</p>
      <p>Changes: ${changes}</p>
      <p>Date Time: ${dateTime}</p>

      <h3> Thank You for shopping with us </h3>
    `;

      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
    /* Add your custom styles here */
    body {
      font-family: Arial, sans-serif;
      width: 8cm;
      margin: 0 auto;
      
    }
    h1, h2, h3, h5, h6 {
      margin: 10px 0;
      text-align: center; /* Center-align text */
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px; /* Add margin between table and other elements */
    }
    th, td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
  </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
      printWindow.document.close();
    }
  };

  const handleSubmit = async () => {
    // Determine the selected payment method
    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    )?.value;

    // Check if any essential value is null
    if (!itemList || !totalPrice || !money || !changes || !paymentMethod) {
      alert("Please fill in all required fields before submitting the order.");
      return; // Don't submit if any essential value is null
    }

    // Send order details to the Firebase database
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        orderedItems: itemList,
        totalPrice: totalPrice,
        money: money,
        changes: changes,
        paymentMethod: paymentMethod, // Include the selected payment method
        timestamp: Timestamp.fromDate(new Date()),
      });
      console.log("Order submitted with ID: ", docRef.id);
      // Show success message
      alert("Order submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Show error message
      alert("Failed to submit order. Please try again later.");
    }
  };
  

  return (
    <div className="cnt">
      <div className="leftcontainer">
        <div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="table-container">
          {/* All Items */}
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Size</th>
                <th>Available Quantity</th>
              </tr>
            </thead>
            <tbody>
              {allItems
                .filter(
                  (item) =>
                    item.itemname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.brand
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.category
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.price.toString().includes(searchTerm)
                )
                .map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={selectedItemId === item.id ? "selected" : ""}
                  >
                    <td>{item.itemname}</td>
                    <td>{item.brand}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.size}</td>
                    <td>10</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="addtolist">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {/* Add to List */}
          <button onClick={handleAddToList} className="addbtn">
            Add to List
          </button>
        </div>

        {/* Display Item List */}
      </div>
      <div className="rightcontainer">
        <div className="rightcontainer-sub">
          <h3>Ordered Item List</h3>
          <div className="ol">
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemname}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <img
                        src={removeIcon}
                        alt="Remove"
                        onClick={() => handleRemoveItem(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-info">
            <div className="info-row">
              <div className="info-title">Total Price:</div>
              <div className="info-value">{totalPrice}</div>
            </div>
            <div className="info-row">
              <div className="info-title">Money:</div>
              <div className="info-value">
                <input type="text" value={money} onChange={handleMoneyChange} />
              </div>
            </div>
            <div className="info-row">
              <div className="info-title">Changes:</div>
              <div className="info-value">{changes}</div>
            </div>
            <div className="info-row">
              <div className="info-title">Order Date Time:</div>
              <div className="info-value">{dateTime}</div>
            </div>
          </div>

          <div className="payment-methods">
            <label>
              <input type="radio" name="payment-method" value="cash" />
              Cash
            </label>
            <label>
              <input type="radio" name="payment-method" value="card" />
              Card
            </label>
          </div>

          <div className="submit-buttons">
            <button onClick={handleSubmit} className="submit">
              Submit
            </button>
            <button onClick={handlePrint} className="print">
              Print
            </button>
            <button onClick={handleCancel} className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
