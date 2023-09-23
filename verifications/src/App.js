import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './app.css';
import Pincode from "./pages/components/Pincode";
import Phone from "./pages/components/Phone";
import Aadhaar from "./pages/components/Aadhaar";
import Email from "./pages/components/Email";
import Test from "./pages/components/Test";

const App = () => {

	return (
		<BrowserRouter>
			<div className="app-main">
				<div className="nav-bar">
					<NavLink to="/"> Email </NavLink>
					<NavLink to="/phone"> Phone </NavLink>
					<NavLink to="/aadhaar"> Aadhaar </NavLink>
					<NavLink to="/pincode"> Pincode </NavLink>
				</div>
			
				<Routes>
					<Route path="/" element={<Email />} />
					<Route path="/phone" element={<Phone />} />
					<Route path="/aadhaar" element={<Aadhaar />} />
					<Route path="/pincode" element={<Pincode />} />

					<Route path="/test" element={<Test />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
