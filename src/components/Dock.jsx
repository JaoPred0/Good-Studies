import React from "react";
import { Home, Inbox, Settings } from "lucide-react";

const Dock = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-base-200 border-t border-base-300 flex justify-around items-center py-2 shadow-md">
      <button className="flex flex-col items-center text-primary">
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button className="flex flex-col items-center text-base-content hover:text-primary">
        <Inbox className="w-6 h-6" />
        <span className="text-xs mt-1">Inbox</span>
      </button>

      <button className="flex flex-col items-center text-base-content hover:text-primary">
        <Settings className="w-6 h-6" />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  );
};

export default Dock;
