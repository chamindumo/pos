import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import firebase from "../Components/Firebase/Firebase";
import "./additems.css";

const firebaseConfig = firebase.firebaseConfig;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddItems = () => {
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    description: null,
    editperson: "emp-01", //this should be change
    itemname: "",
    price: "",
    size: "",
    subCategory: "",
  });
  const [editPersons, setEditPersons] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryMap, setSubCategoryMap] = useState({});
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [maxItemId, setMaxItemId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch edit persons
    const fetchEditPersons = async () => {
      const editPersonSnapshot = await getDocs(collection(db, "editpersons"));
      const editPersonList = editPersonSnapshot.docs.map(
        (doc) => doc.data().name
      );
      setEditPersons(editPersonList);
    };

    // Fetch categories and sub-categories
    const fetchCategoriesAndSubCategories = async () => {
      const itemHeaderSnapshot = await getDocs(collection(db, "item-header"));
      let categories = [];
      let subCategoryMap = {};

      itemHeaderSnapshot.forEach((doc) => {
        const data = doc.data();
        categories.push(data.category);
        if (!subCategoryMap[data.category]) {
          subCategoryMap[data.category] = [];
        }
        subCategoryMap[data.category].push(data.subcategory);
      });

      // Deduplicate categories and subcategories
      categories = [...new Set(categories)];
      for (const key in subCategoryMap) {
        subCategoryMap[key] = [...new Set(subCategoryMap[key])];
      }

      setCategoryList(categories);
      setSubCategoryMap(subCategoryMap);
    };

    // Fetch maximum item ID
    const fetchMaxItemId = async () => {
      const itemSnapshot = await getDocs(
        query(collection(db, "items"), orderBy("itemid", "desc"), limit(1))
      );
      if (!itemSnapshot.empty) {
        const maxId = itemSnapshot.docs[0].data().itemid;
        setMaxItemId(maxId);
      } else {
        setMaxItemId("itm-0"); // If no items exist, set the initial max ID
      }
    };

    fetchEditPersons();
    fetchCategoriesAndSubCategories();
    fetchMaxItemId();
  }, [db]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({
      ...formData,
      category: selectedCategory,
    });
    if (selectedCategory && subCategoryMap[selectedCategory]) {
      setFilteredSubCategories(subCategoryMap[selectedCategory]);
    } else {
      setFilteredSubCategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? null : value, // Set null if value is empty
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if required fields are not null
      const requiredFields = [
        "brand",
        "category",
        "editperson",
        "itemname",
        "price",
        "size",
        "subCategory",
      ];
      for (const field of requiredFields) {
        if (!formData[field]) {
          alert(`Please fill in the ${field} field.`);
          return;
        }
      }

      // Generate item ID
      const newItemId = generateItemId(maxItemId);

      // Add new item to Firestore
      await addDoc(collection(db, "items"), {
        ...formData,
        itemid: newItemId,
        editdate: Timestamp.now(), // Set edit date to current timestamp
      });
      console.log("Item added successfully!");

      // Show success message as alert
      alert("Item added successfully!");

      // Clear form data after submission
      setFormData({
        brand: "",
        category: "",
        description: null,
        editperson: "",
        itemname: "",
        price: "",
        size: "",
        subCategory: "",
      });

      // Optionally, show a success message or redirect the user
    } catch (error) {
      console.error("Error adding item: ", error);
      // Optionally, show an error message to the user
    }
  };

  // Function to generate next item ID based on the maximum item ID
  const generateItemId = (maxId) => {
    const prefix = "itm-";
    const currentNumber = parseInt(maxId.replace(prefix, ""));
    const nextNumber = currentNumber + 1;
    return prefix + nextNumber;
  };

  // Format price as decimal 10,2
  const formattedPrice = parseFloat(formData.price).toFixed(2);

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add New Items</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-group">
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-group">
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              {categoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="form-group">
            Sub-category:
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Sub-category</option>
              {filteredSubCategories.map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </label>
          <label className="form-group">
            Description:
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="form-input"
            ></textarea>
          </label>
          <label className="form-group">
            Added Person: Current logged in user show here !
          </label>
          <label className="form-group">
            Item Name:
            <input
              type="text"
              name="itemname"
              value={formData.itemname}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-group">
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-group">
            Size:
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <button type="submit" className="form-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
