import { ChangeEventHandler } from "react";

function HotelSearchBox({ searchTerm, callBack }: ComponentProps) {
  return (
    <input
      type="text"
      placeholder="بین نام هتل ها و توضیحاتشون جستجو کن ..."
      className="border py-2.5 px-2 rounded-lg w-full border-neutral-200 bg-white focus:border-neutral-500 focus-visible:outline-none"
      value={searchTerm}
      onChange={callBack}
    />
  );
}

interface ComponentProps {
  searchTerm: string;
  callBack: ChangeEventHandler<HTMLInputElement>;
}

export default HotelSearchBox;
