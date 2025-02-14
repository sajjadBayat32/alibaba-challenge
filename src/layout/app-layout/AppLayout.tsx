import { ReactNode } from "react";
import Header from "../header/Header";

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1200px] h-dvh mx-auto px-4">
      <div className="flex flex-col pt-4 gap-10">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
