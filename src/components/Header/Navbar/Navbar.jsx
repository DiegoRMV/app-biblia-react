const Navbar = () => {
	return <div>
        <nav className="flex gap-8 text-lg font-semibold tracking-wide">
            <a href="/" className="hover:text-green-300">Home</a>
            <a href="/biblia" className="hover:text-green-300">Biblia</a>
            {/* <a href="/search">Search</a> */}
        </nav>
    </div>;
};

export default Navbar;
