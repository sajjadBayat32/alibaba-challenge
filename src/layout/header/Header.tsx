import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="rounded-lg bg-white py-3 px-4">
      <div className="flex items-center gap-4">
        <div className="h-8 w-30">
          <img src={"/logo.svg"} className="object-fill" alt="Logo" />
        </div>
        <ul className="flex gap-2 ms-5">
          <li>
            <Link className="text-[16px]" to={"/"}>
              <div className="px-4 transition-all hover:border-color-primary border-b-2 border-transparent">
                خانه
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
