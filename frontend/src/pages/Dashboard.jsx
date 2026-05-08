import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
    projectId: "",
  });

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", projectForm);

      setProjectForm({
        title: "",
        description: "",
      });

      fetchProjects();

      alert("Project Created");
    } catch (error) {
      console.log(error);
    }
  };

   const deleteProject = async (id) => {
  try {
    await API.delete(`/projects/${id}`);

    fetchProjects();

    alert("Project Deleted");
  } catch (error) {
    console.log(error);
  }
};
 

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", {
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
        status: taskForm.status,
        dueDate: taskForm.dueDate,
        ProjectId: Number(taskForm.projectId),
      });

      setTaskForm({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        projectId: "",
      });

      fetchTasks();

      alert("Task Created");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(`/tasks/${id}`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]text-white">
      {/* SIDEBAR + CONTENT */}

      <div className="flex">
        {/* SIDEBAR */}

        <div className="w-[260px] min-h-screen bg-black border-r border-gray-800 p-8 hidden md:block">
          <h1 className="text-3xl font-bold text-white tracking-widest mb-14">
            Task Manager
          </h1>

          <div className="space-y-5 text-gray-400">
            <div className="bg-white text-black px-4 py-3 rounded-xl font-semibold">
              Dashboard
            </div>

            <div className="hover:text-white transition cursor-pointer text-white">
              Projects
            </div>

            <div className="hover:text-white transition cursor-pointer text-white">
              Tasks
            </div>

            <div className="hover:text-white transition cursor-pointer text-white">
              Analytics
            </div>

            <div className="hover:text-white transition cursor-pointer text-white">
              Team
            </div>
          </div>

          <button
            className="mt-16 w-full border border-gray-700 py-3 rounded-xl text-white hover:bg-white hover:text-black transition"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        {/* MAIN CONTENT */}

        <div className="flex-1 p-8">
          {/* TOP BAR */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold">
                Dashboard Overview
              </h2>

              <p className="text-black-500 mt-2">
                Manage your projects and tasks
              </p>
            </div>

            <div className="mt-5 md:mt-0">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#111] border border-gray-800 px-5 py-3 rounded-xl outline-none w-[300px]"
              />
            </div>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-black text-white p-6 rounded-3xl">
              <p className="text-white font-medium">
                Total Tasks
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {tasks.length}
              </h2>
            </div>

            <div className="bg-black text-white p-6 rounded-3xl">
              <p className="text-white font-medium">
                Completed
              </p>

              <h2 className="text-6xl font-semibold tracking-tight mt-3">
                {
                  tasks.filter(
                    (t) =>
                      t.status === "completed"
                  ).length
                }
              </h2>
            </div>

            <div className="bg-black text-white p-6 rounded-3xl">
              <p className="text-white font-medium">
                Pending
              </p>

              <h2 className="text-6xl font-semibold tracking-tight mt-3">
                {
                  tasks.filter(
                    (t) =>
                      t.status !== "completed"
                  ).length
                }
              </h2>
            </div>

            <div className="bg-black text-white p-6 rounded-3xl">
              <p className="text-white font-medium">
                Projects
              </p>

              <h2 className="text-6xl font-semibold tracking-tight mt-3">
                {projects.length}
              </h2>
            </div>
          </div>

          {/* FORMS */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* CREATE PROJECT */}

            <form
              onSubmit={createProject}
              className="bg-[#111] border border-gray-800 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold mb-8">
                Create Project
              </h2>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Project Title"
                  className="w-full bg-black border  p-4 rounded-2xl outline-none focus:border-white  text-white"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      title: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Project Description"
                  rows="5"
                  className="w-full bg-black border  p-4 rounded-2xl outline-none focus:border-white"
                  value={
                    projectForm.description
                  }
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description:
                        e.target.value,
                    })
                  }
                />

                <button className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition">
                  Create Project
                </button>
              </div>
            </form>

            {/* CREATE TASK */}

            <form
              onSubmit={createTask}
              className="bg-[#111] border  rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold mb-8">
                Assign Task
              </h2>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="w-full bg-black border  p-4 rounded-2xl outline-none focus:border-white  text-white"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      title: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Task Description"
                  rows="4"
                  className="w-full bg-black border  p-4 rounded-2xl outline-none focus:border-white"
                  value={
                    taskForm.description
                  }
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      description:
                        e.target.value,
                    })
                  }
                />

                <select
                  className="w-full bg-black border  p-4 rounded-2xl outline-none"
                  value={taskForm.priority}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      priority:
                        e.target.value,
                    })
                  }
                >
                  <option value="low">
                    Low Priority
                  </option>

                  <option value="medium">
                    Medium Priority
                  </option>

                  <option value="high">
                    High Priority
                  </option>
                </select>

                <input
                  type="date"
                  className="w-full bg-black border  p-4 rounded-2xl outline-none"
                  value={taskForm.dueDate}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      dueDate:
                        e.target.value,
                    })
                  }
                />

                <select
                  className="w-full bg-black border  p-4 rounded-2xl outline-none"
                  value={taskForm.projectId}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      projectId:
                        e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select Project
                  </option>

                  {projects.map((project) => (
                    <option
                      key={project.id}
                      value={project.id}
                    >
                      {project.title}
                    </option>
                  ))}
                </select>

                <button className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition">
                  Assign Task
                </button>
              </div>
            </form>
          </div>

          {/* PROJECTS */}

          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                Projects
              </h2>

              <button className="border border-gray-700 px-5 py-2 rounded-xl hover:bg-black hover:text-white transition">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
  key={project.id}
  className="bg-[#111] border border-gray-800 p-6 hover:border-white transition rounded-none"
>
  <div className="flex items-start justify-between mb-4">
    <h3 className="text-xl font-semibold tracking-tight">
      {project.title}
    </h3>

    <button
      onClick={() =>
        deleteProject(project.id)
      }
      className="text-xs border border-red-500 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white transition uppercase tracking-wide"
    >
      Delete
    </button>
  </div>

  <p className="text-gray-500 leading-7">
    {project.description}
  </p>
</div>
              ))}
            </div>
          </div>

          {/* TASKS */}

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                Task Progress
              </h2>

              <button className="border border-gray-700 px-5 py-2 rounded-xl hover:bg-black hover:text-white transition">
                Manage Tasks
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#111] border border-gray-800 rounded-3xl p-6 hover:border-white transition"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-2xl font-bold">
                      {task.title}
                    </h3>

                    <span className="border border-gray-600 text-sm px-4 py-1 rounded-full">
                      {task.priority}
                    </span>
                  </div>

                  <p className="text-gray-500 mb-6 leading-7">
                    {task.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Status
                      </span>

                      <span>
                        {task.status}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Due Date
                      </span>

                      <span>
                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <select
                    className="w-full bg-black border p-4 rounded-2xl outline-none text-white"
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        task.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="todo">
                      Todo
                    </option>

                    <option value="in-progress">
                      In Progress
                    </option>

                    <option value="completed">
                      Completed
                    </option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}