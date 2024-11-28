"use client";

import { useRouter } from "next/navigation";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

const NavigationBtn = () => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    const isInternalReferrer = referrer.includes(window.location.origin);
    setCanGoBack(isInternalReferrer);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    } else {
        router.push("/main")
    }
  };

  const handleGoHome = () => {
    router.push("/main");
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "75px",
        left: "75px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Button
        onClick={handleGoHome}
        className="flex items-center gap-2 px-3 py-2 bg-transparent hover:bg-gray-300"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Home</span>
      </Button>

      <Button
        onClick={handleGoBack}
        className="flex items-center gap-2 px-3 py-2 bg-transparent hover:bg-gray-300"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Go Back</span>
      </Button>
      
    </div>
  );
};

export default NavigationBtn;
