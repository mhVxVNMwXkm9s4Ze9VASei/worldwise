import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [currentCity, setCurrentCity] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);

				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();

				setCities(data);
			} catch {
				alert("There was an error loading the cities data...");
			} finally {
				setIsLoading(false);
			}
		}

		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);

			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();

			setCurrentCity(data);
		} catch {
			alert("There was an error loading the current city...");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				currentCity,
				getCity,
				isLoading,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);

	if (context === undefined)
		throw new Error("CitiesContext used outside of CitiesProvider!");

	return context;
}

export { CitiesProvider, useCities };
