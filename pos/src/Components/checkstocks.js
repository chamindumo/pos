import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from "../Components/Firebase/Firebase";
import Barcode from "react-barcode";
import "./checkstocks.css";

const firebaseConfig = firebase.firebaseConfig;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CheckStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const stocksSnapshot = await getDocs(collection(db, "stocks"));
      const stocksData = stocksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStocks(stocksData);
    };

    fetchStocks();
  }, [db]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredStocks(stocks);
      return;
    }

    const filtered = stocks.filter((stock) =>
      stock.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [searchQuery, stocks]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="stocks-container">
      <h1>Stocks</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="stocks-list">
        {filteredStocks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Supplier</th>
                <th>Manufacture Date</th>
                <th>Expire Date</th>
                <th>Stock Path</th> {/* New table header */}
                <th>Barcode</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.itemName}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.unitprice}</td>
                  <td>{stock.supplier}</td>
                  <td>{stock.manufactureDate}</td>
                  <td>{stock.expireDate}</td>
                  <td>{stock.stockpath}</td> {/* Include stockpath field */}
                  <td>
                    <Barcode value={stock.barcode} width={1} height={10} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default CheckStocks;