"use client";

import { Calendar, Briefcase, GraduationCap, User, Plus } from "lucide-react";

const SideBar = () => {
  const defaultFolders = [
    { id: 1, name: "Today", icon: Calendar, count: 5, active: true },
    { id: 2, name: "Work", icon: Briefcase, count: 3, active: false },
    { id: 3, name: "School", icon: GraduationCap, count: 2, active: false },
    { id: 4, name: "Personal", icon: User, count: 1, active: false },
  ];

  return (
    <div className="flex flex-col h-screen bg-emerald-500 px-5 p-2 w-64 min-h-screen text-white text-center">
      {/* Header */}
      <div className="py-2 border-b border-emerald-400">
        <h1 className="text-xl font-bold ">Gawâ</h1>
      </div>

      <div className="mt-5">
        {/* Add Folder */}
        <div className="py-2 ">
          <button className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-emerald-400 hover:bg-white/50  hover:text-white transition-all duration-200 cursor-pointer group">
            <Plus className="w-5 h-5 mr-3 text-white" />
            <span className="font-medium ">Add Folder</span>
          </button>
        </div>

        {/* Folders */}
        <div className="flex-1 py-4">
          <nav className="space-y-2">
            {defaultFolders.map((folder) => (
              <div
                key={folder.id}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  folder.active
                    ? "bg-white/20 text-white shadow-sm border border-white/20"
                    : "hover:bg-white/10 text-white/80 hover:text-white hover:shadow-sm"
                }`}
              >
                <div className="flex items-center">
                  <folder.icon className="w-5 h-5 mr-3 text-white" />
                  <span className="font-medium text-sm">{folder.name}</span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                  {folder.count}
                </span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
