"use client";

import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function NavigationBtn() {

  const { theme, resolvedTheme } = useTheme()
  const router = useRouter();
  const path = usePathname()
  const [isVisible, setIsVisible] = useState(true);
  const referrer = document.referrer;
  const isInternalReferrer = referrer.includes(window.location.origin);

  useEffect(() => {
    const isMainPath = window.location.pathname.endsWith("/main");
    setIsVisible(!isMainPath);
  }, [path, resolvedTheme]);

  const handleGoBack = () => {
    if (isInternalReferrer) {
      router.back();
    } else {
      router.push("/main");
    }
  };

  const handleGoHome = () => {
    router.push("/main");
  };

  if (!isVisible || resolvedTheme.includes('mobile')) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "65px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Button
        onClick={handleGoHome}
        className="flex items-center gap-2 bg-transparent hover:bg-gray-300"
      >
        <HomeIcon className="h-5 w-5" />
        {(theme.includes('desktop')) && <span>Home</span>}
      </Button>

      <Button
        onClick={handleGoBack}
        className="flex items-center gap-2 bg-transparent hover:bg-gray-300"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        {(theme.includes('desktop')) && <span>Go back</span>}
      </Button>
    </div>
  );
}
