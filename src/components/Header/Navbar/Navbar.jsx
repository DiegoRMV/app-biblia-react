import { Link } from "react-router-dom";

const Navbar = () => {
	return <div>
        <nav className="flex gap-8 text-lg font-semibold tracking-wide">
            <Link to="/" className="hover:text-green-300">Home</Link>
            <Link to="/biblia" className="hover:text-green-300">Biblia</
            Link>
            {/* <a href="/search">Search</a> */}
        </nav>
    </div>;
};

export default Navbar;
