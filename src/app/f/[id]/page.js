"use client";
import { useParams } from "next/navigation";
import { useFolders } from "../../context/folderContext";
import NavBar from "../../components/nav-bar";
import SideBar from "../../components/side-bar";

export default function FolderPage() {
  const params = useParams();
  const folderId = params.id;

  const { folders } = useFolders();

  const currentFolder = folders.find((f) => f.id === folderId);

  if (!currentFolder) {
    return (
      <div className="flex w-full min-h-screen bg-stone-100 text-black">
        <div className="w-64 bg-white h-screen sticky top-0 overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 p-4">
            <NavBar />
          </div>
          <div className="flex-1 p-8 bg-gray-50 h-screen overflow-y-auto flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Folder not found</h1>
              <p className="text-gray-500">
                The folder you are looking for does not exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-stone-100 text-black">
      <div className="w-64 bg-white h-screen sticky top-0 overflow-y-auto">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-8 bg-gray-50 h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold">{currentFolder.name} Folder</h1>
          <p className="text-gray-500">
            This is the {currentFolder.name} folder. You can add tasks, notes,
            and more here.
          </p>
          <div className="mt-4">
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-md">
              Add Task
            </button>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-md">
              Add Note
            </button>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-md">
              Add Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
