import { useState } from "react";

const Result = () => {
	const [generate, setGenerate] = useState({});
	const [search, setSearch] = useState({});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const searchBiblia = async (isRandom, version="rv1960", book="genesis", chapter="1", verse="1") => {
		try {
			setLoading(true)
			const response = await fetch(
				`https://bible-api.deno.dev/api/read/${version}/${book}/${chapter}`
			);
			const data = await response.json();
			// console.log(data);
			
			if (isRandom) {
				
				setGenerate({
					version: version,
					name: data.name,
					chapter: data.chapter,
					verse: data.vers[Math.floor(Math.random() * data.vers.length)],
					size: data.vers.length,
					// number: randomVerse.number,
					// verse: randomVerse.verse,
				});
			} else {
				setSearch({
					version: version,
					name: data.name,
					chapter: data.chapter,
					verse: data.vers[verse],
					size: data.vers.length,
					// number: data.vers[verse].number,
					// verse: data.vers[verse].verse,
				});
			}
			setLoading(false)
		} catch (error) {
			// console.log(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	// const generateVerse = async () => {

	// 	const randomBook = books[Math.floor(Math.random() * books.length)];
	// 	const randomChapter = Math.floor(Math.random() * randomBook.chapters) + 1;

	// 	try {
	// 		const response = await fetch(
	// 			`https://bible-api.deno.dev/api/read/${vBiblia.version}/${randomBook.name}/${randomChapter}`
	// 		);
	// 		const dataChapter = await response.json();

	// 		const randomVerse =
	// 			dataChapter.vers[
	// 				Math.floor(Math.random() * dataChapter.vers.length) + 1
	// 			];
	// 		setChapter(dataChapter);
	// 		setVerse(randomVerse);
	// 		console.log(dataChapter);
	// 		console.log(randomVerse);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const randomVerse = Math.floor(Math.random() * dataChapter.vers.length) + 1;
	// 		try {
	// 			const response = await fetch(
	// 				`https://bible-api.deno.dev/api/read/rv1960/${randomBook.name}/${randomChapter}/${randomVerse}`
	// 			);

	// 			const verso = await response.json();
	// 			console.log(verso);
	// 			setChapter(verso);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	return {
		searchBiblia,
		generate,
		search,
		error,
		loading,
	};
};

export default Result;
