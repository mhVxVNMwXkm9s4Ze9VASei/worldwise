import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message="Add your first country by clicking on a city on the map." />
		);

	const countries = cities.reduce((acc, city) => {
		if (!acc.map((el) => el.country).includes(city.country))
			return [...acc, { country: city.country, emoji: city.emoji }];
		else return acc;
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem
					key={country.country}
					country={country}
				/>
			))}
		</ul>
	);
}

export default CountryList;
