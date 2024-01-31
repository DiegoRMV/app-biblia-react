import { Routes, Route } from "react-router-dom";
import Home from "../view/Home/Home";
import Biblia from "../view/Biblia/Biblia";
import Search from "../view/Search/Search";

const MyRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/biblia" element={<Biblia />} />
			<Route path="/search" element={<Search />} />
		</Routes>
	);
};

export default MyRoutes;
