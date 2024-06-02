import dynamic from "next/dynamic";
import Loading from "@/components/loading-element";

export const ShiftsApplicationLayout = dynamic(() => import("../layouts/shift_application_layout"), {
	ssr: true,
	loading: function LoadingComponent() {
		return <Loading />;
	},
});
export const MainPageLayout = dynamic(() => import("../layouts/main_page_layout"), {
	ssr: false,
	loading: function LoadingComponent() {
		return <Loading />;
	},
});
export const AppLayout = dynamic(() => import("../layouts/app_layout"), {
	ssr: true,
	loading: function LoadingComponent() {
		return <Loading />;
	},
});