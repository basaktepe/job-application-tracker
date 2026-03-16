import Navbar from "@/shared/components/Navbar";
import DataLoader from "@/shared/components/DataLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DataLoader>{children}</DataLoader>
    </div>
  );
}