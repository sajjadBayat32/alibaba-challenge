function PageLoading() {
	return (
		<div className="h-[calc(100vh-250px)] flex items-center justify-center">
			<div className="w-70 h-40 rounded-lg bg-white">
				<div className="flex items-center w-full  h-full justify-center">
					<div className="font-bold">در حال بارگذاری...</div>
				</div>
			</div>
		</div>
	);
}

export default PageLoading;
