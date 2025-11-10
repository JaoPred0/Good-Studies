import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dock from "./Dock";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar fixa no desktop */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col relative">
        {/* Navbar sempre no topo */}
        <div className="sticky top-0">
          <Navbar />
        </div>

        {/* Conteúdo do desktop */}
        <main className="hidden lg:flex flex-1 overflow-y-auto p-6 w-full">
          {children}
        </main>

        {/* Drawer + conteúdo móvel */}
        <div className="drawer lg:hidden flex-1 flex flex-col w-full">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col w-full">
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </div>

          <div className="drawer-side z-40">
            <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
            <div className="bg-base-200 min-h-full w-64">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* Dock inferior — apenas em telas pequenas */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
          <Dock />
        </div>
      </div>
    </div>
  );
};

export default Layout;
