import React from "react";
import { ProjectEntity } from "../types";

const defaultState: {
  projects: ProjectEntity[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectEntity[]>>;
} = {
  projects: [],
  setProjects: () => {},
};

const ProjectsContext = React.createContext(defaultState);

export default ProjectsContext;
