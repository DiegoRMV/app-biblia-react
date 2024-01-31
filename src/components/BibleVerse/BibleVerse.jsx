import { useState } from "react";
import Result from "../../api/results";
import { books, versions } from "../../utils/data";

const BibleVerse = () => {
	const { searchBiblia, generate, error, loading } = Result();
	const [version, setVersion] = useState("Reina Valera 1960");
	const [band, setBand] = useState(false);

	const handleRandomVerse = () => {
		const randomVersion = versions[Math.floor(Math.random() * versions.length)];
		const randomBook = books[Math.floor(Math.random() * books.length)];
		const randomChapter = Math.floor(Math.random() * randomBook.chapters) + 1;
		searchBiblia(true, randomVersion.version, randomBook.name, randomChapter);
		setVersion(randomVersion.name);
		setBand(true);
	};

	if (error) {
		return <div>Error en api</div>;
	}

	const load = () => {
		if (loading) {
			return <div className="mt-10">Cargando...</div>;
		}
		if (band) {
			return (
				<div className="grow flex flex-col items-center justify-center">
					<p className="text-lg font-medium mb-4">
						{`${generate.name} ${generate.chapter + ":"}${
							generate.verse?.number
						}`}
					</p>
					<p className="text-lg font-medium mb-4">{version}</p>
					<p className="text-md px-4">{generate.verse?.verse}</p>
				</div>
			);
		}
	};

	return (
		<div className="flex flex-col h-full">
			<h1 className="text-2xl font-semibold">Bible Verse Generator</h1>
			<div>
				<button
					className="bg-[#000] px-4 py-2 rounded-2xl hover:bg-[#3a3636] hover:border-2 mt-4"
					onClick={handleRandomVerse}
				>
					Generate Verse
				</button>
			</div>
			{load()}
		</div>
	);
};

export default BibleVerse;
