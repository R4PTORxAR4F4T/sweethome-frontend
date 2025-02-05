import Sidebar from "@/Component/Sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex">
        <Sidebar></Sidebar>
        <main className="w-full mx-8">{children}</main>
      </div>
    );
  };
  
  export default DashboardLayout;
  