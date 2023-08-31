import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import styles from "./Map.module.css";
import Button from "./Button";

function Map() {
	const { cities } = useCities();
	const {
		getPosition,
		isLoading: isLoadingGeolocation,
		position: geolocationPosition,
	} = useGeolocation();

	const [mapPosition, setMapPosition] = useState([40, 33]);
	const [searchParams] = useSearchParams();

	const mapLat = searchParams.get("lat");
	const mapLng = searchParams.get("lng");

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geolocationPosition)
			setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
	}, [geolocationPosition]);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button
					type="position"
					onClick={getPosition}
				>
					{isLoadingGeolocation ? "Loading..." : "Use your position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				className={styles.map}
				scrollWheelZoom={true}
				zoom={6}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						key={city.id}
						position={[city.position.lat, city.position.lng]}
					>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();

	map.setView(position);

	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (event) =>
			navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
	});
}

export default Map;
