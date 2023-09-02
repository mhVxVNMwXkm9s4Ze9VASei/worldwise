import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
	cities: [],
	currentCity: {},
	error: "",
	isLoading: false,
};

function reducer(state, action) {
	switch (action.type) {
		case "cities/loaded":
			return {
				...state,
				cities: action.payload,
				isLoading: false,
			};

		case "city/created":
			return {
				...state,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
				isLoading: false,
			};

		case "city/deleted":
			return {
				...state,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: initialState.currentCity,
				isLoading: false,
			};

		case "city/loaded":
			return {
				...state,
				currentCity: action.payload,
				isLoading: false,
			};

		case "loading":
			return { ...state, isLoading: true };

		case "rejected":
			return {
				...state,
				error: action.payload,
				isLoading: false,
			};

		default:
			throw new Error("Unknown action type.");
	}
}

function CitiesProvider({ children }) {
	const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
		reducer,
		initialState
	);
	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });

			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();

				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error loading data...",
				});
			}
		}

		fetchCities();
	}, []);

	async function createCity(newCity) {
		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error creating the city...",
			});
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "loading" });

		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
				body: JSON.string,
			});

			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error deleting the city...",
			});
		}
	}

	async function getCity(id) {
		if (currentCity.id === Number(id)) return;

		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();

			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error loading the city...",
			});
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				createCity,
				currentCity,
				deleteCity,
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
