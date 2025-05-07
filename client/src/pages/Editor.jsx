import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import axios from "axios";

// Plugins
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsForms from "grapesjs-plugin-forms";
import gjsNavbar from "grapesjs-navbar";
import gjsExport from "grapesjs-plugin-export";
import gjsCountdown from "grapesjs-component-countdown";
import { toast } from "react-toastify";

const Editor = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);

  const projectId = localStorage.getItem("currentProjectId");

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/projects/${projectId}`);
      setProjectData(res.data);
    } catch (err) {
      toast.error("Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async () => {
    if (!editorRef.current || !projectId) return;
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();

    try {
      await axios.put(`${backendUrl}/api/projects/${projectId}`, { html, css });
      toast.success("Project saved successfully!");
    } catch (err) {
      toast.error("Failed to save project");
    }
  };

  useEffect(() => {
    if (projectId) fetchProject();
    else setLoading(false);
  }, [projectId]);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const editor = grapesjs.init({
        container: containerRef.current,
        height: "100vh",
        width: "100%",
        storageManager: false,
        fromElement: false,
        components: projectData?.html || "",
        style: projectData?.css || "",
        plugins: [
          gjsPresetWebpage,
          gjsBlocksBasic,
          gjsForms,
          gjsNavbar,
          gjsExport,
          gjsCountdown,
        ],
        pluginsOpts: {
          "grapesjs-preset-webpage": { blocksBasicOpts: { flexGrid: 1 } },
        },
      });

      editorRef.current = editor;

      editor.Panels.addButton("options", {
        id: "save-project",
        className: "fa fa-save",
        command: "save-project",
        attributes: { title: "Save Project" },
      });

      editor.Commands.add("save-project", {
        run: saveProject,
      });

      return () => editor.destroy();
    }
  }, [loading, projectData]);

  if (loading) return <p className="p-4">Loading project...</p>;

  return <div id="gjs" ref={containerRef} style={{ height: "100vh" }} />;
};

export default Editor;
