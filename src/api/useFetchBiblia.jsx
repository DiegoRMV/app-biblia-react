import { useState } from "react";

const useFetchBiblia = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});

	const fetchBiblia = async (version="rv1960", book="genesis", chapter="1") => {
		try {
			setLoading(true)
			const response = await fetch(
				`https://bible-api.deno.dev/api/read/${version}/${book}/${chapter}`
			);
			const data = await response.json();
			console.log(data);
			setData(data);
			setLoading(false)
		} catch (error) {
			console.log(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};


	return {
		fetchBiblia,
		error,
		loading,
		data
	};
};

export default useFetchBiblia;
