import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import firebase from "../Components/Firebase/Firebase";
import Barcode from "react-barcode";
import { v4 as uuidv4 } from 'uuid';
import "./addstocks.css";

const firebaseConfig = firebase.firebaseConfig;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddStocks = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    unitprice: "",
    supplier: "",
    manufactureDate: "",
    expireDate: "",
    barcode: "",
    stockpath: "",
  });
  const [supplierList, setSupplierList] = useState([]);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // Fetch suppliers
    const fetchSuppliers = async () => {
      const supplierSnapshot = await getDocs(collection(db, "suppliers"));
      const suppliers = supplierSnapshot.docs.map((doc) => doc.data().suppliername);
      setSupplierList(suppliers);
    };

    // Fetch items
    const fetchItems = async () => {
      const itemSnapshot = await getDocs(collection(db, "items"));
      const items = itemSnapshot.docs.map((doc) => doc.data().itemname);
      setItemList(items);
    };

    fetchSuppliers();
    fetchItems();
  }, [db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? null : value,
    });

    // Generate barcode when an item is selected
    if (name === "itemName") {
      const generatedBarcode = generateBarcode(value);
      setFormData((prevData) => ({
        ...prevData,
        barcode: generatedBarcode,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requiredFields = ["itemName", "quantity", "unitprice", "supplier", "manufactureDate", "expireDate", "stockpath"];
      for (const field of requiredFields) {
        if (!formData[field]) {
          alert(`Please fill in the ${field} field.`);
          return;
        }
      }

      // Add new stock to Firestore
      await addDoc(collection(db, "stocks"), {
        ...formData,
        timestamp: Timestamp.now(),
      });
      console.log("Stock added successfully!");

      alert("Stock added successfully!");

      clearForm();
    } catch (error) {
      console.error("Error adding stock: ", error);
    }
  };

  const clearForm = () => {
    setFormData({
      itemName: "",
      quantity: "",
      unitprice: "",
      supplier: "",
      manufactureDate: "",
      expireDate: "",
      barcode: "",
      stockpath: "",
    });
  };

  // Function to generate a unique barcode based on the item name
  const generateBarcode = (itemName) => {
    const uuid = uuidv4();
    return uuid.substring(0, 12);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add New Stocks</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-group">
            Item Name:
            <select
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Item</option>
              {itemList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="form-group">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-group">
          Unit Price:
            <input
              type="number"
              name="unitprice"
              value={formData.unitprice}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-group">
            Supplier:
            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Supplier</option>
              {supplierList.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </label>
          <label className="form-group">
            Manufacture Date:
            <input
              type="date"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-group">
            Expire Date:
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-group">
            Stock Path:
            <input
              type="text"
              name="stockpath"
              value={formData.stockpath}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <div className="form-group">
            <label className="form-label">Barcode:</label>
            <Barcode value={formData.barcode} />
          </div>
          <button type="submit" className="form-submit">
            Submit
          </button>
          <button type="button" className="form-cancel" onClick={clearForm}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStocks;
