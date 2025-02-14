import { ChangeEventHandler } from "react";

function HotelSearchBox({
	searchTerm,
	callBack,
}: {
	searchTerm: string;
	callBack: ChangeEventHandler<HTMLInputElement>;
}) {
	return (
		<input
			type="text"
			placeholder="بین نام هتل ها و توضیحاتشون جستجو کن ..."
			className="border p-2 rounded-lg w-full border-neutral-200 bg-white focus:border-neutral-500 focus-visible:outline-none"
			value={searchTerm}
			onChange={callBack}
		/>
	);
}

export default HotelSearchBox;
