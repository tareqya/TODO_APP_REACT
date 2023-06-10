import React from "react";
import "./HomeScreen.css";

import { Button, Form, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { NavTabs } from "../../components";
import { ProjectEntity } from "../../types";
import { BASE_URL } from "../../constants";
import { Outlet } from "react-router-dom";
import { ApiRequest } from "../../utils/ApiRequest";
import ProjectsContext from "../../context/ProjectsContext";

const ADD_PROJECT_URL = `${BASE_URL}/project`;

function HomeScreen() {
  const { projects, setProjects } = React.useContext(ProjectsContext);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");

  const handleSaveProjectPress = async () => {
    if (projectName.trim() === "") {
      return;
    }

    const _project: ProjectEntity = {
      id: uuidv4(),
      title: projectName,
      tasks: [],
      createdTime: new Date().getTime(),
    };
    try {
      const response = await ApiRequest(ADD_PROJECT_URL, _project, "POST");
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    setProjects([...projects, _project]);
    setProjectName("");
    setVisibleModal(false);
  };

  return (
    <div className="HomeScreen">
      <NavTabs
        tabs={projects.map((project) => {
          return {
            key: project.id,
            path: `/project/${project.id}`,
            title: project.title,
          };
        })}
        onPress={() => setVisibleModal(true)}
      />

      <Modal
        show={visibleModal}
        onHide={() => setVisibleModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            isValid={projectName.trim() !== ""}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type="text"
            placeholder="Enter project name..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisibleModal(false)}>
            Close
          </Button>
          <Button onClick={() => handleSaveProjectPress()} variant="primary">
            Save Project
          </Button>
        </Modal.Footer>
      </Modal>

      <Outlet />
    </div>
  );
}

export default HomeScreen;
