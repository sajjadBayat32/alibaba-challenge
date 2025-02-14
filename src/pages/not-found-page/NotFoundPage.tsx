import { useNavigate } from "react-router-dom";

function NotFoundPage({ title }: ComponentProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[calc(100vh-250px)] flex items-center justify-center">
      <div className="rounded-lg bg-white py-10 px-6 max-w-[500px] w-full">
        <div className="flex flex-col size-full items-center gap-10">
          <div className="w-50 h-18 relative">
            <img src="/images/404.png" className="object-fill" alt="" />
          </div>
          <h1 className="font-bold text-xl">{title}</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 px-4 cursor-pointer py-1.5 rounded-md text-[14px] hover:bg-gray-700 hover:text-white transition"
          >
            بازگشت به صفحه قبلی
          </button>
        </div>
      </div>
    </div>
  );
}

interface ComponentProps {
  title: string;
}

export default NotFoundPage;
