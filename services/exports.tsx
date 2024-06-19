import dynamic from "next/dynamic";
import LoadingElement from "@/components/loading-element";

// export const ShiftsApplicationLayout = dynamic(() => import("../dynamic_cmps/shift_application_page_cmp"), {
// 	ssr: true,
// 	loading: function LoadingComponent() {
// 		return <Loading />;
// 	},
// });
export const AppLayout = dynamic(() => import("../dynamic_cmps/app_layout"), {
		ssr: false,
		loading: function LoadingComponent() {
			return <LoadingElement />;
		},
	});
export const MainRouteLayout = dynamic(() => import("../dynamic_cmps/main_layout"), {
	ssr: false,
	loading: function LoadingComponent() {
		return <LoadingElement />;
	},
	});