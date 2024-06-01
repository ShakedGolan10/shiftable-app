import dynamic from "next/dynamic";
import Loading from "@/components/loading-element";

// Map must be dynamically loaded, since leaflet updates the DOM on import, breaking server-side rendering
// export const EmployeeHomePage = dynamic(() => import("../components/employee-home-page"), {
// 	ssr: false,
// 	loading: function LoadingComponent() {
// 		return <Loading />;
// 	},
// });

export const ShiftsApplicationLayout = dynamic(() => import("../layouts/shift_application_layout"), {
	ssr: false,
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
	ssr: false,
	loading: function LoadingComponent() {
		return <Loading />;
	},
});