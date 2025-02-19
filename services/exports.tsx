import dynamic from "next/dynamic";
import LoadingElement from "@/components/helpers/loading-element";


export const AppLayout = dynamic(() => import("../dynamic_cmps/app_layout"), {
		ssr: false,
		loading: function LoadingComponent() {
			return <LoadingElement />;
		},
	});
