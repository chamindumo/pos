//sidebar.js
import React from "react";
import { useState } from "react";
import { Layout } from "antd";
import Logo from "./logo";

const {Header, Sider} = Layout;
function App() {
	return (
	<Layout>
		<Sider className="sidebar">
			<Logo/>
		</Sider>
	</Layout>	
  );
}
export default App;
