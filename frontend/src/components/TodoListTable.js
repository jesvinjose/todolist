import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
function TodoListTable() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/task/getalltasks`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setFilteredTasks(data); // Set the tasks and filtered tasks in state
        } else {
          console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures it only runs once on mount

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 2; // Number of items per page

  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddTask = async () => {
    if (formData.title && formData.description) {
      const newTask = {
        title: formData.title,
        description: formData.description,
      };

      try {
        const response = await fetch(`${BaseUrl}/api/task/addtask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          const data = await response.json();
          const addedTask = data.task;

          // Update state with the new task
          setTasks([...tasks, addedTask]);
          setFilteredTasks([...tasks, addedTask]);

          // Clear form data and hide the add form
          setFormData({
            title: "",
            description: "",
          });
          setShowAddForm(false);
        } else {
          console.error("Failed to add task:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleCancel = () => {
    setCurrentTask(null);
    setShowEditForm(false);
    setFormData({
      title: "",
      description: "",
    });
  };

  const handleUpdateTask = async () => {
    if (currentTask && formData.title && formData.description) {
      const updatedTask = {
        title: formData.title,
        description: formData.description,
      };

      try {
        const response = await fetch(
          `${BaseUrl}/api/task/edittask/${currentTask._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const updatedTaskFromApi = data.task;

          // Update the tasks and filteredTasks state to reflect the change
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === updatedTaskFromApi._id ? updatedTaskFromApi : task
            )
          );

          setFilteredTasks((prevFilteredTasks) =>
            prevFilteredTasks.map((task) =>
              task._id === updatedTaskFromApi._id ? updatedTaskFromApi : task
            )
          );

          // Clear form data and close the edit form
          setFormData({
            title: "",
            description: "",
          });
          setShowEditForm(false);
          setCurrentTask(null);
        } else {
          console.error("Failed to update task:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/api/task/deletetask/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Update the tasks state after successful deletion
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
      setFilteredTasks((prevFilteredTasks) =>
        prevFilteredTasks.filter((t) => t._id !== id)
      );
      setCurrentPage(1); // Reset to the first page after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleCompletionStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus; // Toggle the current status

    try {
      const response = await fetch(`${BaseUrl}/api/task/changestatus/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      // Update tasks and filteredTasks state to reflect the change
      setTasks((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, completionStatus: newStatus } : item
        )
      );

      setFilteredTasks((prevFiltered) =>
        prevFiltered.map((item) =>
          item._id === id ? { ...item, completionStatus: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  useEffect(() => {
    if (showEditForm && currentTask) {
      setFormData({
        title: currentTask.title,
        description: currentTask.description,
      });
    }
  }, [showEditForm, currentTask, setFormData]);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* Header Section */}
        <div className="w-full bg-blue-500 text-white text-center p-8 shadow-md">
          <h1 className="text-4xl font-bold">To-Do List!</h1>
        </div>

        {/* Main Content Section */}
        <div className="w-full max-w-4xl mt-8 bg-white shadow-lg rounded-lg p-6">
          {/* Top Section with Tasks Title and Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Tasks</h2>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setShowEditForm(false); // Reset edit form if switching to add
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              {showAddForm ? "Cancel" : "Add Task"}
            </button>
          </div>

          {/* Search Box */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search tasks..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Add Task Form */}
          {showAddForm && (
            <div className="mb-6">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Task title"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Task description"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Add Task
              </button>
            </div>
          )}

          {/* Edit Task Form */}
          {showEditForm && (
            <div className="mb-6">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Task title"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Task description"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleUpdateTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Update Task
              </button>
              <button
                onClick={handleCancel}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Tasks Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-4 px-6 text-left">Title</th>
                  <th className="border-b py-4 px-6 text-left">Description</th>
                  <th className="border-b py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((task) => (
                  <tr key={task._id}>
                    <td className="border-b py-4 px-6">{task.title}</td>
                    <td className="border-b py-4 px-6">{task.description}</td>
                    <td className="border-b py-4 px-6">
                      <button
                        onClick={() => {
                          setCurrentTask(task);
                          setShowEditForm(true);
                          setShowAddForm(false);
                        }}
                        className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          handleToggleCompletionStatus(
                            task._id,
                            task.completionStatus
                          )
                        }
                        className={`ml-2 px-4 py-2 rounded-md transition ${
                          task.completionStatus
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-400 hover:bg-gray-500"
                        } text-white`}
                      >
                        {task.completionStatus ? "Completed" : "Pending"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoListTable;
