"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFolders } from "../../context/folderContext";
import NavBar from "../../components/nav-bar";
import SideBar from "../../components/side-bar";
import {
  Plus,
  Trash2,
  Settings,
  Users,
  TrendingUp,
  ClipboardCheck,
  ScrollText,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Calendar,
  Briefcase,
  GraduationCap,
  User,
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
  X,
  Pencil,
  Menu,
} from "lucide-react";

export default function FolderPage() {
    const params = useParams();
  const router = useRouter();
    const folderId = params.id;

  const {
    folders,
    updateFolder,
    deleteFolder,
    addTask,
    updateTask,
    deleteTask,
  } = useFolders();

  const currentFolder = folders.find((f) => f.id === folderId);
  const tasks = currentFolder?.tasks || [];

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editFolderName, setEditFolderName] = useState(
    currentFolder?.name || "",
  );
  const [editIconName, setEditIconName] = useState(
    currentFolder?.iconName || "Folder",
  );

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "Medium",
    status: "Active",
    dueDate: "",
    overDue: false,
    notes: "",
    completed: false,
  });
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

  const handleEdit = () => {
    if (editFolderName.trim()) {
      const capitalizedName =
        editFolderName.charAt(0).toUpperCase() + editFolderName.slice(1);
      updateFolder(folderId, {
        name: capitalizedName,
        iconName: editIconName,
      });
      setShowEditForm(false);
    }
  };
  const handleAddTask = () => {
    if (newTask.name.trim()) {
      const task = {
        id: crypto.randomUUID(),
        ...newTask,
      };
      addTask(folderId, task);
      setNewTask({
        name: "",
        priority: "Medium",
        status: "Active",
        dueDate: "",
        overDue: false,
        notes: "",
        completed: false,
      });
      setShowAddTaskForm(false);
    }
  };

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete "${currentFolder?.name}" folder?`,
      )
    ) {
      deleteFolder(folderId);
      router.push("/dashboard");
    }
  };

  if (!currentFolder) {
        return (
      <div className="flex w-full min-h-screen bg-stone-100 text-black">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar - Desktop always visible, Mobile slides in */}
        <div
          className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white h-screen transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block overflow-y-auto`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
            <h1 className="text-xl font-bold text-gray-900">Gawâ</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <SideBar onLinkClick={() => setSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col w-full md:w-auto">
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center gap-4">
              {/* Burger Menu Button - Mobile Only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex-1">
                <NavBar />
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-8 bg-gray-50 h-screen overflow-y-auto flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-bold">Folder not found</h1>
              <p className="text-sm md:text-base text-gray-500 mt-2">
                The folder you are looking for does not exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;
  const notes = tasks.filter((task) => task.notes).length;

  return (
    <div className="flex w-full min-h-screen bg-stone-100 text-black">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Desktop always visible, Mobile slides in */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white h-screen transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h1 className="text-xl font-bold text-gray-900">Gawâ</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <SideBar onLinkClick={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col w-full md:w-auto">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            {/* Burger Menu Button - Mobile Only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <NavBar />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 md:p-8 bg-gray-50 h-screen overflow-y-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {currentFolder.name} Folder
                </h1>
                <p className="text-sm md:text-base text-gray-500">
                  Manage your {currentFolder.name.toLowerCase()} tasks and
                  productivity
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <button
                  onClick={handleDelete}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-all duration-200
                  flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => {
                    setEditFolderName(currentFolder?.name || "");
                    setEditIconName(currentFolder?.iconName || "Folder");
                    setShowEditForm(!showEditForm);
                  }}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-all duration-200
                  flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowAddTaskForm(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Task</span>
                </button>
              </div>
            </div>

            {/* Edit Folder Form */}
            {showEditForm && (
              <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Folder
                  </h3>
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Folder name"
                  value={editFolderName}
                  onChange={(e) => setEditFolderName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 mb-4"
                  autoFocus
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {availableIcons.map((iconOption) => (
                      <button
                        key={iconOption.name}
                        onClick={() => setEditIconName(iconOption.name)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          editIconName === iconOption.name
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <iconOption.icon
                          className={`w-5 h-5 ${
                            editIconName === iconOption.name
                              ? "text-emerald-600"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Add New Task Form */}
            {showAddTaskForm && (
              <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add New Task
                  </h3>
                  <button
                    onClick={() => setShowAddTaskForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Task name"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 mb-4"
                  autoFocus
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Notes (optional)"
                  value={newTask.notes}
                  onChange={(e) =>
                    setNewTask({ ...newTask, notes: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
                  rows="3"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setShowAddTaskForm(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="p-4 md:p-8 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Total Tasks
                    </h3>
                    <div className="text-2xl font-bold text-black">
                      {totalTasks}
                    </div>
                    <div className="text-sm text-emerald-500">
                      <span className="font-medium">+0</span>
                      <span className="text-emerald-400"> from last week</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:border-l md:border-gray-300 md:pl-6">
                  <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="w-10 h-10 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Completed
                    </h3>
                    <div className="text-2xl font-bold text-black">
                      {completedTasks}
                    </div>
                    <div className="text-sm text-emerald-500">
                      <span className="font-medium">+0</span>
                      <span className="text-emerald-400"> from last week</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:border-l md:border-gray-300 md:pl-6">
                  <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Completion Rate
                    </h3>
                    <div className="text-2xl font-bold text-black">
                      {completionRate}%
                    </div>
                    <div className="text-sm text-emerald-500">
                      <span className="font-medium">+0.0%</span>
                      <span className="text-emerald-400"> from last week</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:border-l md:border-gray-300 md:pl-6">
                  <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                    <ScrollText className="w-10 h-10 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Notes</h3>
                    <div className="text-2xl font-bold text-black">{notes}</div>
                    <div className="text-sm text-red-500">
                      <span className="font-medium">-0</span>
                      <span className="text-red-400"> from last week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-emerald-100 focus:border-emerald-100 transition-all duration-200 bg-white hover:border-gray-400"
                      />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="w-4 h-4 " />
                      <span className="hidden sm:inline">Filter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                      <td className="px-3 md:px-6 py-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => {
                              updateTask(folderId, task.id, {
                                completed: !task.completed,
                              });
                            }}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <div className="ml-3 md:ml-4 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <div
                                className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                              >
                                {task.name}
                              </div>
                              {/* Show priority badge on mobile */}
                              <span
                                className={`md:hidden inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  task.priority === "High"
                                    ? "bg-red-100 text-red-800"
                                    : task.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>
                            {task.notes && (
                              <div className="text-sm text-gray-500">
                                {task.notes}
                              </div>
                            )}
                            {/* Show due date on mobile if exists */}
                            {task.dueDate && (
                              <div className="md:hidden text-xs text-gray-400 mt-1">
                                Due: {task.dueDate}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            task.status === "Active"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.dueDate}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1">
                            <Pencil className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => setTaskToDelete(task.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Delete Confirmation Dialog */}
              {taskToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Delete Task?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to delete this task? This action
                      cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setTaskToDelete(null)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          deleteTask(folderId, taskToDelete);
                          setTaskToDelete(null);
                        }}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
