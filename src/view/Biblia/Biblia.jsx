import { useEffect } from "react";
import useFetchBiblia from "../../api/useFetchBiblia";
import { versions, books } from "../../utils/data";
import { useForm } from "react-hook-form";

const Biblia = () => {
	const { fetchBiblia, loading, error, data } = useFetchBiblia();
	const {
		register,
		// handleSubmit,
		watch,
		// formState: { errors },
		getValues,
		setValue,
	} = useForm();

	useEffect(() => {
		fetchBiblia(undefined, undefined, getValues("chapter"));
	}, []);

	useEffect(() => {
		const subscription = watch((value) => {
			const max = books.filter((book) => book.name === value.book);
			if (getValues("chapter") <= max[0].chapters) {
				fetchBiblia(value.version, value.book, value.chapter);
			} else {
				setValue("chapter", "1");
				fetchBiblia(value.version, value.book, 1);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const handlePrevClick = () => {
		if (parseInt(getValues("chapter")) < 2) return;
		setValue("chapter", parseInt(getValues("chapter")) - 1);
		// fetchBiblia(undefined, undefined, getValues("chapter"));
	};

	const handleNextClick = (num) => {
		if (parseInt(getValues("chapter")) >= num) return;
		setValue("chapter", parseInt(getValues("chapter")) + 1);
		// fetchBiblia(undefined, undefined, getValues("chapter"));
	};

	return (
		<div className="inline-block w-full h-screen">
			<div className="w-full flex justify-center text-white">
				<form action="" className="mt-24">
					<div className="flex gap-2">
						<select
							{...register("version")}
							className="bg-black rounded-md p-1"
						>
							{versions.map((version) => (
								<option key={version.name} value={version.version}>
									{version.name}
								</option>
							))}
						</select>
						<select {...register("book")} className="bg-black rounded-md p-1">
							{books.map((book) => (
								<option key={book.name} value={book.name}>
									{book.name}
								</option>
							))}
						</select>
					</div>
				</form>
			</div>
			<div className="flex justify-center items-center h-full max-h-[70vh]">
				{loading ? (
					<div className="text-white text-center text-xl mt-4">cargando...</div>
				) : (
					<div className="w-full max-w-2xl mt-4 flex justify-center flex-col">
						<div className="pl-2">
							<h1 className="text-white text-center text-xl">
								capitulo {data.chapter}
							</h1>
							<div className="h-full max-h-[60vh] overflow-y-scroll pl-10 pr-4 bg-slate-400">
								<ol className="list-decimal">
									{data.vers?.map((v) => (
										<div key={v.id}>
											{v.study ? (
												<h1 className="text-white text-center text-2xl my-2">
													{v.study}
												</h1>
											) : (
												""
											)}
											<li className="text-white mt-1">{v.verse}</li>
										</div>
									))}
								</ol>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="w-full mt-6 flex justify-center gap-4">
				<button
					className="bg-black px-4 py-1 rounded-md"
					onClick={handlePrevClick}
				>
					Prev
				</button>
				<form className="flex gap-2 items-center">
					<span className="opacity-40">cap.</span>

					<input
						type="number"
						{...register("chapter")}
						className="w-16 bg-black text-center"
						min={1}
						max={data.num_chapters}
						defaultValue={1}
					/>

					<span className="opacity-40">de</span>
					{data.num_chapters}
				</form>
				<button
					className="bg-black px-4 py-1 rounded-md"
					onClick={(e) => handleNextClick(data.num_chapters, e)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Biblia;
