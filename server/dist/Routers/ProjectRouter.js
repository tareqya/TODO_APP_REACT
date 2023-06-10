"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Project_1 = __importDefault(require("../Model/Project"));
const router = express_1.default.Router();
// fetch all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project_1.default.find();
        return res.status(200).send({ projects, msg: "Fetch projects success" });
    }
    catch (err) {
        console.log(err);
        return res
            .status(400)
            .send({ projects: [], msg: "Failed to fetch projects!" });
    }
});
//fetch project by id
router.get("/project/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project_1.default.findOne({ id: id });
        return res.status(200).send({ project, msg: "Fetch project success" });
    }
    catch (err) {
        console.log(err);
        return res
            .status(400)
            .send({ project: undefined, msg: "Failed to fetch project!" });
    }
});
//add new project
router.post("/project", async (req, res) => {
    try {
        const _project = req.body;
        const project = new Project_1.default({
            id: _project.id,
            title: _project.title,
            tasks: [],
            createdTime: _project.createdTime,
        });
        project.save();
        return res.status(200).send("Create project success");
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Failed to create project");
    }
});
//update existing project
router.put("/project/:id", async (req, res) => {
    try {
        const project = req.body;
        const { id } = req.params;
        const updatedFields = {
            title: project.title,
            tasks: project.tasks,
        };
        await Project_1.default.updateOne({ id: id }, updatedFields);
        return res.status(200).send({ msg: "Update project success" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ msg: "Failed to update project!" });
    }
});
//delete project
router.delete("/project/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Project_1.default.deleteOne({ id: id });
        return res.status(200).send({ msg: "Remove project success" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ msg: "Failed to remove project!" });
    }
});
exports.default = router;
