import React from "react";
import "./ProjectView.css";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Form, Modal, Stack } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { BASE_URL } from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import { ProjectEntity, Task } from "../../../../types";
import { Loading } from "../../../../components";
import { Icons } from "../../../../assets";
import { ApiRequest } from "../../../../utils/ApiRequest";
import ProjectsContext from "../../../../context/ProjectsContext";

const PROJECT_URL = `${BASE_URL}/project`;

function ProjectView() {
  const navigate = useNavigate();
  const { projects, setProjects } = React.useContext(ProjectsContext);
  const { id } = useParams();
  const [data, loading, error] = useFetch(`${PROJECT_URL}/${id}`);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [taskModalVisible, setTaskModalVisible] = React.useState(false);
  const [taskTtile, setTaskTitle] = React.useState("");
  const [project, setProject] = React.useState<ProjectEntity | undefined>(
    undefined
  );

  React.useEffect(() => {
    setErrorMsg("");
    if (error !== "") {
      setErrorMsg(error);
      return;
    }
    if (data && data.project) {
      setProject(data.project);
    }

    if (data && data.project == null) {
      setErrorMsg("Failed to fetch project data!");
    }
  }, [data, error]);

  const updateProject = async (project: ProjectEntity) => {
    try {
      const response = await ApiRequest(`${PROJECT_URL}/${id}`, project, "PUT");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddNewTask = async () => {
    if (taskTtile.trim() === "") return;
    if (project) {
      const _project = { ...project };
      _project.tasks.push({
        id: uuidv4(),
        title: taskTtile,
        isComplete: false,
        order: _project.tasks.length + 1,
      });
      // save on database
      await updateProject(_project);
      setProject(_project);
    }

    setTaskTitle("");
    setTaskModalVisible(false);
  };

  const handleRemoveTask = async (task: Task) => {
    if (project) {
      const _project = { ...project };
      _project.tasks = _project.tasks.filter((t) => t.id !== task.id);

      // remove from database
      await updateProject(_project);
      setProject(_project);
    }
  };

  const handleOnCheckTask = async (task: Task) => {
    if (project) {
      const _project = { ...project };
      _project.tasks = _project.tasks.map((t) =>
        t.id !== task.id ? t : { ...task, isComplete: !task.isComplete }
      );

      // update from database
      await updateProject(_project);
      setProject(_project);
    }
  };

  const handleRemoveProject = async () => {
    try {
      if (!project) return;
      await ApiRequest(`${PROJECT_URL}/${id}`, project, "DELETE");
      const _projects: ProjectEntity[] = projects.filter(
        (p) => p.id !== project.id
      );
      setProjects(_projects);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ProjectView">
      <Modal
        show={taskModalVisible}
        onHide={() => setTaskModalVisible(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            isValid={taskTtile.trim() !== ""}
            value={taskTtile}
            onChange={(e) => setTaskTitle(e.target.value)}
            type="text"
            placeholder="Enter task name..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setTaskModalVisible(false)}
          >
            Close
          </Button>
          <Button onClick={() => handleAddNewTask()} variant="primary">
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
      {loading && <Loading />}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {project && (
        <div className="Container">
          <div className="removeBtn" onClick={() => handleRemoveProject()}>
            <Icons.TrashIcon size={20} color="rgb(214, 120, 127)" />
          </div>
          <h1>{project.title}</h1>
          <h4>Tasks List</h4>
          <div className="divider" />

          <div style={{ marginTop: 10 }}>
            {project.tasks.map((task) => (
              <Stack
                style={{ marginBottom: 10 }}
                gap={2}
                direction="horizontal"
                key={task.id}
                className="taskWrapper"
              >
                <Form.Check
                  type={"checkbox"}
                  checked={task.isComplete}
                  onChange={() => handleOnCheckTask(task)}
                />
                <span>{task.title}</span>
                <div
                  className="removeTaskBtn"
                  onClick={() => handleRemoveTask(task)}
                >
                  <Icons.CloseIcon size={20} color={"rgb(214, 120, 127)"} />
                </div>
              </Stack>
            ))}

            <div
              className="addTaskBtn"
              onClick={() => setTaskModalVisible(true)}
            >
              <Icons.PlusIcon color="gray" size={20} />
              <span>Add task...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectView;
