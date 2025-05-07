import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PromptMethod = () => {
  const [prompt, setPrompt] = useState("");
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleGenerate = async () => {
    if (!prompt.trim() || !projectName.trim()) {
      toast.error("Please enter both project name and website description.");
      return;
    }

    setLoading(true);
    try {
      const projectRes = await axios.post(`${backendUrl}/api/projects`, { name: projectName , description : prompt });
      const { project } = projectRes.data;

      const generateRes = await axios.post(`${backendUrl}/api/generate-website`, { prompt });
      const { html, css } = generateRes.data;

      await axios.put(`${backendUrl}/api/projects/${project._id}`, { html, css });

      localStorage.setItem("currentProjectId", project._id);
      localStorage.setItem("generatedHtml", html);
      localStorage.setItem("generatedCss", css);

      navigate("/drag-drop");
    } catch (err) {
      toast.error("Failed to create project or generate website.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-green-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">🚀 Generate Your Website</h2>

        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="w-full p-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your website idea..."
          className="w-full h-40 p-4 mb-5 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 rounded-lg text-lg font-semibold hover:from-green-500 hover:to-blue-600 transition ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Generating..." : "Generate Website"}
        </button>
      </div>
    </div>
  );
};

export default PromptMethod;
