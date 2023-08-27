import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";

const BASE_URL = "http://localhost:8000";

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);

				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();

				setCities(data);
				console.log(cities, isLoading);
			} catch {
				alert("There was an error loading the cities data...");
			} finally {
				setIsLoading(false);
			}
		}

		fetchCities();
	}, []);

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
				>
					<Route
						index
						element={
							<CityList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					/>
					<Route
						path="cities"
						element={
							<CityList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					/>
					<Route
						path="countries"
						element={
							<CountryList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					/>
					<Route
						path="form"
						element={<p>Form.</p>}
					/>
				</Route>
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
