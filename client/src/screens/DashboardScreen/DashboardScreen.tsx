import React from "react";
import "./DashboardScreen.css";
import useFetch from "../../hooks/useFetch";
import { ProjectEntity } from "../../types";
import { BASE_URL } from "../../constants";
import { Chart } from "react-google-charts";

const FETCH_PROJECTS_URL = `${BASE_URL}/projects`;

function DashboardScreen() {
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
        if (project.tasks.length > 0) _projects.push(project);
      }
      setProjects(_projects);
    }
  }, [data, loading, error]);

  return (
    <div className="DashboardScreen">
      <h1>Dashboard</h1>
      <div className="divider" />
      <div className="projectsWrapper">
        {projects.map((project) => (
          <Chart
            chartType="PieChart"
            data={[
              ["Tasks", "Statistics"],
              ["Complete", project.tasks.filter((t) => t.isComplete).length],
              [
                "Not Compelete",
                project.tasks.filter((t) => !t.isComplete).length,
              ],
            ]}
            options={{
              title: project.title,
            }}
            width={400}
            height={200}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardScreen;
