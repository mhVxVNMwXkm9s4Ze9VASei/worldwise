import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";

function Map() {
	const navigate = useNavigate();

	const { cities } = useCities();

	const [searchParams, setSearchParams] = useSearchParams();
	const [mapPosition, setMapPosition] = useState([40, 33]);

	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				center={mapPosition}
				className={styles.map}
				scrollWheelZoom={true}
				zoom={13}
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
			</MapContainer>
		</div>
	);
}

export default Map;
