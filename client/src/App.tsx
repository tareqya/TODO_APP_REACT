import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { SideBar } from "./components";
import { DashboardScreen, HomeScreen } from "./screens";
import { ProjectView } from "./screens/HomeScreen/Containers";
import ProjectsContext from "./context/ProjectsContext";
import { ProjectEntity } from "./types";
import useFetch from "./hooks/useFetch";
import { BASE_URL } from "./constants";

const FETCH_PROJECTS_URL = `${BASE_URL}/projects`;

function App() {
  const [projects, setProjects] = React.useState<ProjectEntity[]>([]);
  const [data, loading, error] = useFetch(FETCH_PROJECTS_URL);

  React.useEffect(() => {
    if (error !== "") {
      console.error(error);
      return;
    }
    if (data && data.projects) {
      const _projects: ProjectEntity[] = [];
      for (let p of data.projects) {
        const project: ProjectEntity = {
          id: p.id,
          title: p.title,
          tasks: p.tasks,
          createdTime: p.createdTime,
        };

        _projects.push(project);
      }
      setProjects(_projects);
    }
  }, [data, loading, error]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      <div className="App">
        <div className="SideBarWrapper">
          <SideBar />
        </div>
        <Routes>
          <Route path="/" element={<HomeScreen />}>
            <Route path="/project/:id" element={<ProjectView />} />
          </Route>
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </div>
    </ProjectsContext.Provider>
  );
}

export default App;
