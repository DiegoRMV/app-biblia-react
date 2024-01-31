import { useForm } from "react-hook-form";
import Result from "../../api/results";
import { books, versions } from "../../utils/data";
import { useEffect, useState } from "react";

const Search = () => {
	const { searchBiblia, search, error, loading } = Result();
	const [band, setBand] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		// formState: { errors },
		getValues,
	} = useForm();	

	const handleSearch = (e) => {
		console.log(e.versions, e.books, e.chapters, e.numbers);
		setBand(true);
		searchBiblia(false, e.versions, e.books, e.chapters, "1");
		
	};


	useEffect(() => {
		
		const subscription = watch((value) => {
			setBand(false)
			if (value.chapters === "" && value.numbers === "") {
				searchBiblia(false, value.versions, value.books);
			}

			if (value.chapters !== "" && value.numbers !== "") {
				searchBiblia(
					false,
					value.versions,
					value.books,
					value.chapters,
					value.numbers
				);
			}
			if (value.chapters !== "" && value.numbers === "") {
				searchBiblia(false, value.versions, value.books, value.chapters);
			}
			if (value.chapters === "" && value.numbers !== "") {
				searchBiblia(false, value.versions, value.books);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const chapt = () => {
		const aux = [];
		const cap = books.filter((book) => book.name === watch("books"));

		if (cap.length > 0) {
			for (let index = 0; index < cap[0].chapters; index++) {
				aux.push(
					<option key={index} value={index + 1}>
						{index + 1}
					</option>
				);
			}
		}
		return aux;
	};

	const verst = () => {
		const aux = [];

		if (search.size > 0) {
			for (let index = 0; index < search.size; index++) {
				aux.push(
					<option key={index} value={index}>
						{index + 1}
					</option>
				);
			}
		}
		return aux;
	};


	

	const load = () => {
		if (error) {
			return <div className="mt-10">Error...</div>;
		}
		if (loading && band) {
			return <div className="mt-10">Cargando...</div>;
		}
		if (band) {
			return (
				<div className="grow flex flex-col items-center justify-center text-center">
					<p className="text-lg font-medium mb-4">
						{`${getValues("books")} ${getValues("chapters") + ":"}${
							search.verse.number
						}`}
					</p>
					<p className="text-lg font-medium mb-4">{getValues("versions")}</p>
					<p className="text-md">{search.verse.verse}</p>
					{console.log(search.verse)}
				</div>
			);
		}
	};

	return (
		<div className="flex w-full h-screen">
			<div className="w-full h-full flex flex-col items-center pt-20">
				<form
					className="p-2 w-full max-w-[600px] flex items-center justify-center gap-2"
					action=""
					onSubmit={handleSubmit(handleSearch)}
				>
					<select
						className="py-1 px-2 rounded-lg bg-black"
						name="versions"
						id="versions"
						{...register("versions")}
					>
						{versions.map((version) => (
							<option key={version.name} value={version.version}>
								{version.name}
							</option>
						))}
					</select>
					<select
						className="py-1 px-2 rounded-lg bg-black"
						name="books"
						id="books"
						{...register("books", { required: true })}
					>
						{/* <option key={""} value={""}></option> */}
						{books.map((book) => (
							<option key={book.name} value={book.name}>
								{book.name}
							</option>
						))}
					</select>
					<select
						className="py-1 px-2 rounded-lg bg-black"
						name="chapters"
						id="chapters"
						{...register("chapters", { required: true })}
						// onChange={onSelect}
					>
						<option key={""} value={""}></option>

						{chapt()}
					</select>
					<select
						className="py-1 px-2 rounded-lg bg-black"
						name="numbers"
						id="numbers"
						{...register("numbers")}
					>
						<option key={""} value={""}></option>
						{verst()}
					</select>

					<button className="bg-[#000] border-2 border-[#000] px-4 py-1 rounded-xl hover:bg-[#3a3636] hover:border-2 hover:border-[#fff]">
						search
					</button>
				</form>

				{load()}
			</div>
		</div>
	);
};

export default Search;
Search;
