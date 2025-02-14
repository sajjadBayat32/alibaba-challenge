function Rate({ rate }: { rate: number }) {
  return (
    <span className="text-white w-fit text-[12px] bg-yellow-500 rounded-md h-5 flex items-center px-3">
      {rate} ستاره
    </span>
  );
}

export default Rate;
