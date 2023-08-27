import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Homepage />}
				/>
				<Route
					path="*"
					element={<PageNotFound />}
				/>
				<Route
					path="app"
					element={<AppLayout />}
				/>
				<Route
					path="Login"
					element={<Login />}
				/>
				<Route
					path="pricing"
					element={<Pricing />}
				/>
				<Route
					path="product"
					element={<Product />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
