import express from "express";
import { Request, Response } from "express";
import Project from "../Model/Project";

const router = express.Router();

// fetch all projects
router.get("/projects", async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    return res.status(200).send({ projects, msg: "Fetch projects success" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ projects: [], msg: "Failed to fetch projects!" });
  }
});

//fetch project by id
router.get("/project/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ id: id });
    return res.status(200).send({ project, msg: "Fetch project success" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ project: undefined, msg: "Failed to fetch project!" });
  }
});

//add new project
router.post("/project", async (req: Request, res: Response) => {
  try {
    const _project = req.body;
    const project = new Project({
      id: _project.id,
      title: _project.title,
      tasks: [],
      createdTime: _project.createdTime,
    });
    project.save();
    return res.status(200).send("Create project success");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to create project");
  }
});

//update existing project
router.put("/project/:id", async (req: Request, res: Response) => {
  try {
    const project = req.body;
    const { id } = req.params;
    const updatedFields = {
      title: project.title,
      tasks: project.tasks,
    };

    await Project.updateOne({ id: id }, updatedFields);
    return res.status(200).send({ msg: "Update project success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Failed to update project!" });
  }
});

//delete project
router.delete("/project/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Project.deleteOne({ id: id });
    return res.status(200).send({ msg: "Remove project success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Failed to remove project!" });
  }
});

export default router;
