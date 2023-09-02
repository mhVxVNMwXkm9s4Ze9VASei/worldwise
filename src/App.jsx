import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

import { AuthProvider } from "./contexts/FakeAuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
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
									<Navigate
										replace
										to="cities"
									/>
								}
							/>
							<Route
								path="cities"
								element={<CityList />}
							/>
							<Route
								path="cities/:id"
								element={<City />}
							/>
							<Route
								path="countries"
								element={<CountryList />}
							/>
							<Route
								path="form"
								element={<Form />}
							/>
						</Route>
						<Route
							path="login"
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
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
