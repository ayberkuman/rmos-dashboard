import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="md:max-w-[calc(100vw-16rem)] w-full">
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
