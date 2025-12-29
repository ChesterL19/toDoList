"use client";
import React, { useState } from "react";
import { useFolders } from "../context/folderContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Briefcase,
  GraduationCap,
  User,
  Plus,
  Folder,
  Heart,
  Star,
  Home,
  ShoppingCart,
  Book,
  Gamepad2,
  Music,
  Mail,
  Pill,
  Mountain,
  Backpack,
  Check,
  Pencil,
  X,
} from "lucide-react";

const SideBar = ({ onLinkClick }) => {
  const { folders, addFolder, updateFolder } = useFolders();
  const pathname = usePathname();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Folder");
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [editIconName, setEditIconName] = useState("Folder");

  const availableIcons = [
    { name: "Folder", icon: Folder, default: true },
    { name: "Calendar", icon: Calendar },
    { name: "Briefcase", icon: Briefcase },
    { name: "GraduationCap", icon: GraduationCap },
    { name: "User", icon: User },
    { name: "Heart", icon: Heart },
    { name: "Star", icon: Star },
    { name: "Home", icon: Home },
    { name: "ShoppingCart", icon: ShoppingCart },
    { name: "Book", icon: Book },
    { name: "Gamepad2", icon: Gamepad2 },
    { name: "Music", icon: Music },
    { name: "Mail", icon: Mail },
    { name: "Pill", icon: Pill },
    { name: "Mountain", icon: Mountain },
    { name: "Backpack", icon: Backpack },
    { name: "Check", icon: Check },
  ];

  const iconMap = {
    Calendar: Calendar,
    Briefcase: Briefcase,
    GraduationCap: GraduationCap,
    User: User,
    Folder: Folder,
    Heart: Heart,
    Star: Star,
    Home: Home,
    ShoppingCart: ShoppingCart,
    Book: Book,
    Gamepad2: Gamepad2,
    Music: Music,
    Mail: Mail,
    Pill: Pill,
    Mountain: Mountain,
    Backpack: Backpack,
    Check: Check,
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white px-5 py-2 w-64">
      {/* Header */}
      <div className="py-2 border-b border-emerald-400 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Gawâ</h1>
      </div>

      <div className="mt-5">
        {/* Add Folder */}
        <div className="py-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center w-full rounded-lg bg-emerald-400 hover:bg-emerald-400/50 hover:text-white transition-all duration-200 cursor-pointer group px-4 py-3"
          >
            <Plus className="w-5 h-5 text-white" />
            <span className="font-medium ml-3">Add Folder</span>
          </button>

          {showAddForm && (
            <div className="px-4 py-4">
              <input
                type="text"
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40 transition-all duration-200"
                autoFocus
              />

              <div className="grid grid-cols-4 gap-2 mt-3">
                {availableIcons.map((iconOption) => (
                  <button
                    key={iconOption.name}
                    onClick={() => setSelectedIcon(iconOption.name)}
                    className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                      selectedIcon === iconOption.name
                        ? "border-emerald-400 bg-emerald-400/20"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <iconOption.icon className="w-5 h-5 text-white" />
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    if (newFolderName.trim()) {
                      const capitalizedName =
                        newFolderName.charAt(0).toUpperCase() +
                        newFolderName.slice(1);
                      const newFolder = {
                        id: crypto.randomUUID(),
                        name: capitalizedName,
                        iconName: selectedIcon,
                        count: 0,
                        active: false,
                      };
                      addFolder(newFolder);
                      setNewFolderName("");
                      setSelectedIcon("Folder");
                      setShowAddForm(false);
                    }
                  }}
                  className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Folders */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-2">
            {folders.map((folder) => (
              <div key={folder.id} className="group relative">
                {editingFolderId === folder.id ? (
                  <div className="px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-400/30">
                    <input
                      type="text"
                      value={editFolderName}
                      onChange={(e) => setEditFolderName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40 transition-all duration-200 mb-2"
                      placeholder="Folder name"
                      autoFocus
                    />
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {availableIcons.map((iconOption) => (
                        <button
                          key={iconOption.name}
                          onClick={() => setEditIconName(iconOption.name)}
                          className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                            editIconName === iconOption.name
                              ? "border-emerald-400 bg-emerald-400/20"
                              : "border-white/20 hover:border-white/40"
                          }`}
                        >
                          <iconOption.icon className="w-4 h-4 text-white" />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (editFolderName.trim()) {
                            const capitalizedName =
                              editFolderName.charAt(0).toUpperCase() +
                              editFolderName.slice(1);
                            updateFolder(folder.id, {
                              name: capitalizedName,
                              iconName: editIconName,
                            });
                            setEditingFolderId(null);
                            setEditFolderName("");
                            setEditIconName("Folder");
                          }
                        }}
                        className="px-3 py-1 bg-emerald-400/30 rounded text-sm hover:bg-emerald-400/40 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingFolderId(null);
                          setEditFolderName("");
                          setEditIconName("Folder");
                        }}
                        className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/f/${folder.id}`}
                    onClick={() => {
                      if (onLinkClick) {
                        onLinkClick();
                      }
                    }}
                    className={`relative flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group ${
                      pathname === `/f/${folder.id}`
                        ? "bg-emerald-500 text-white shadow-sm border border-white/20"
                        : "hover:bg-emerald-500/10 text-white/80 hover:text-white hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center">
                      {React.createElement(iconMap[folder.iconName], {
                        className: "w-5 h-5 text-white",
                      })}
                      <span className="font-medium text-sm ml-3">
                        {folder.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                        {folder.count}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditingFolderId(folder.id);
                          setEditFolderName(folder.name);
                          setEditIconName(folder.iconName);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/20 text-white/60 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="Edit folder"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
