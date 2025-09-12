"use client";
import { createContext, useContext, useState } from "react";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([
    {
      id: crypto.randomUUID(),
      name: "Today",
      iconName: "Calendar",
      count: 5,
      active: true,
    },
    {
      id: crypto.randomUUID(),
      name: "Work",
      iconName: "Briefcase",
      count: 3,
      active: false,
    },
    {
      id: crypto.randomUUID(),
      name: "School",
      iconName: "GraduationCap",
      count: 2,
      active: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Personal",
      iconName: "User",
      count: 1,
      active: false,
    },
  ]);

  const addFolder = (folder) => {
    setFolders([...folders, folder]);
  };

  const updateFolder = (id, updates) => {
    setFolders(
      folders.map((folder) =>
        folder.id === id ? { ...folder, ...updates } : folder,
      ),
    );
  };

  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  return (
    <FolderContext.Provider
      value={{ folders, setFolders, addFolder, updateFolder, deleteFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
};
