import logo from "./netflix_logo.png";
import "./assets/dist/css/style.min.css";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TVShows from "./components/TVShows";
import MovieDetails from "./components/MovieDetails";

function App() {
	return (
		<BrowserRouter>
			<MyNav logo={logo} />
			<Routes>
				<Route
					path="/home"
					element={
						<TVShows
							title="Home"
							secondaryTitles={[
								"Trending Now",
								"Watch It Again",
								"Popular on Netflix",
							]}
							searchQuery={["batman", "spider-man", "superman"]}
						/>
					}
				/>
				<Route
					path="/tvshows"
					element={
						<TVShows
							title="TV Shows"
							secondaryTitles={[
								"Your favorite series",
								"New TV Shows",
								"Old but gold",
							]}
							searchQuery={["one-piece", "crime", "star-wars"]}
						/>
					}
				/>
				<Route path="/:movieId" element={<MovieDetails />} />
			</Routes>
			<MyFooter />
		</BrowserRouter>
	);
}

export default App;
