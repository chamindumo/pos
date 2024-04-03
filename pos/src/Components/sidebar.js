//sidebar.js
import React from "react";
import { useState } from "react";
import { Layout,Menu} from "antd";
import Logo from "./logo";
import MenuList from 'F:/React Project/pos/pos/src/Components/manuList.js';
const {Header, Sider} = Layout;


function App() {
	return (
<div className= 'logo'>
	
	<Layout>
	
		<Sider className="sidebar">
			<Logo/>
			<MenuList/>
		</Sider>
	</Layout>	
</div>
  );
	}
export default App;
