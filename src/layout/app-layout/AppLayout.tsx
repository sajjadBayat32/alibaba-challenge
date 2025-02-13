import { ReactNode } from "react";
import Header from "../header/Header";

function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="max-w-[1200px] mx-auto px-4">
			<div className="pt-4">
				<Header />
			</div>
			<div className="w-full pt-8 pb-4s">{children}</div>
		</div>
	);
}

export default AppLayout;
