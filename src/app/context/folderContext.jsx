"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFolders = localStorage.getItem("todoFolders");
      if (savedFolders) {
        try {
          setFolders(JSON.parse(savedFolders));
        } catch (error) {
          console.error("Error loading folders from localStorage:", error);
        }
      } else {
        // Initialize with default folders if nothing saved
        const defaultFolders = [
          {
            id: crypto.randomUUID(),
            name: "Today",
            iconName: "Calendar",
            count: 0,
            active: true,
            tasks: [],
          },
          {
            id: crypto.randomUUID(),
            name: "Work",
            iconName: "Briefcase",
            count: 0,
            active: false,
            tasks: [],
          },
          {
            id: crypto.randomUUID(),
            name: "School",
            iconName: "GraduationCap",
            count: 0,
            active: false,
            tasks: [],
          },
          {
            id: crypto.randomUUID(),
            name: "Personal",
            iconName: "User",
            count: 0,
            active: false,
            tasks: [],
          },
        ];
        setFolders(defaultFolders);
        localStorage.setItem("todoFolders", JSON.stringify(defaultFolders));
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever folders change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("todoFolders", JSON.stringify(folders));
    }
  }, [folders, isLoaded]);

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

  const addTask = (folderId, task) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              tasks: [...(folder.tasks || []), task],
              count: (folder.tasks || []).length + 1,
            }
          : folder,
      ),
    );
  };

  const updateTask = (folderId, taskId, updates) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              tasks: (folder.tasks || []).map((t) =>
                t.id === taskId ? { ...t, ...updates } : t,
              ),
            }
          : folder,
      ),
    );
  };

  const deleteTask = (folderId, taskId) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              tasks: (folder.tasks || []).filter((t) => t.id !== taskId),
            }
          : folder,
      ),
    );
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        addFolder,
        updateFolder,
        deleteFolder,
        addTask,
        updateTask,
        deleteTask,
      }}
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
