import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="*"
					element={<PageNotFound />}
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
