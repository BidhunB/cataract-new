"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooterRoutes = ["/dashboard"];
  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <>
      <main className="flex-grow">{children}</main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
