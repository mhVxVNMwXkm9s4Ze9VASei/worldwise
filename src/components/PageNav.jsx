import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/FakeAuthContext";
import User from "./User";

function PageNav() {
	const { isAuthenticated } = useAuth();

	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				{!isAuthenticated && (
					<li>
						<NavLink
							className={styles.ctaLink}
							to="/login"
						>
							Login
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default PageNav;
