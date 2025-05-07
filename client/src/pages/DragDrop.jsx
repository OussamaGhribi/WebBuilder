import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DragDrop = () => {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/projects`);
      setProjects(data.projects);
    } catch (error) {
      toast.error("Failed to fetch projects.");
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      return toast.error("Please enter a project name.");
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/projects`, { name: projectName });
      if (data.success) {
        toast.success("Project created successfully!");
        setProjectName("");
        fetchProjects();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/projects/${id}`);
      toast.success("Project deleted successfully.");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project.");
      console.log(error);
    }
  };

  const editProject = (id) => {
    localStorage.setItem("currentProjectId", id);
    navigate("/editor");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6 pt-25">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">🎨 Manage Your Projects</h1>

        <form onSubmit={createProject} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition cursor-pointer"
          >
            Create
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-6">Your Projects</h2>

        {projects.length === 0 ? (
          <p className="text-gray-500 text-center">No projects yet. Start by creating one!</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project._id}
                className="p-6 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-gray-500 text-sm">ID: {project._id}</p>
                </div>
                {project.description && (
                  <p className="text-gray-600 text-sm mt-1 italic">💡 {project.description}</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => editProject(project._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                  >
                    Consult
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DragDrop;
