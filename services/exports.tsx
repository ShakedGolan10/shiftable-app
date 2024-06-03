import dynamic from "next/dynamic";
import Loading from "@/components/loading-element";

export const ShiftsApplicationLayout = dynamic(() => import("../dynamic_cmps/shift_application_page_cmp"), {
	ssr: true,
	loading: function LoadingComponent() {
		return <Loading />;
	},
});
export const MainPageLayout = dynamic(() => import("../dynamic_cmps/main_page_cmp"), {
	ssr: false,
	loading: function LoadingComponent() {
		return <Loading />;
	},
});
export const AppLayout = dynamic(() => import("../dynamic_cmps/app_page_cmp"), {
	ssr: true,
	loading: function LoadingComponent() {
		return <Loading />;
	},
});