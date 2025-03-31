import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/AppSidebar";

export const metadata: Metadata = {
  title: "Kita.io - E-commerce shop AI analyzer",
  description: "E-commerce shop AI analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="absolute top-0 left-0" />
          <main className="w-full mx-4">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
