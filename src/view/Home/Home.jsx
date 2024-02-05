import BibleVerse from "../../components/BibleVerse/BibleVerse";

const Home = () => {
	return (
		<div className="w-full h-screen flex justify-center items-top">
			<div className="max-w-[750px] w-full mt-[100px] text-center flex flex-col">
				<div className="bg-[#1ca5aa] p-4 py-10 rounded-3xl">
					<h1 className="text-5xl font-bold">Bienvenida Karen 😁</h1>
				</div>
				<div className="mt-8 grow">
					<BibleVerse />
				</div>
			</div>
		</div>
	);
};

export default Home;
