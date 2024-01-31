import Navbar from "./Navbar/Navbar";

const Header = () => {
	return (
		<header className="fixed top-0 w-full max-w-[1440px] flex justify-between p-6 bg-black">
			<div>
				<span className="italic text-2xl font-bold tracking-wider">Biblia<span className="text-green-300">GX</span></span>
			</div>
			<Navbar />	 
		</header>
	);
};

export default Header;
