//sidebar.js
import React from "react";
import { useState } from "react";
import { Layout } from "antd";
//import '.F:/React Project/pos/pos/src/Components/Assests/ sidebar.css';


const {Header, Sider} = Layout;
function App() {
	return (
	<Layout>
		<Sider className="sidebar">siderbar</Sider>
	</Layout>	
  );
}
export default App;
