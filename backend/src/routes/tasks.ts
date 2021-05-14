import express, { Request, Response } from "express";
import { Tasks } from "../entities/Tasks";
import { verifyJWT } from "../middlewares/verifyJwt";
import { getRepository } from "typeorm";
import { Users } from "../entities/Users";

const tasksRouter = express.Router();

tasksRouter.get("/", [verifyJWT], async (req: Request, res: Response) => {
  if (req.user) {
    const tasksRepository = getRepository(Tasks);
    const tasks = await tasksRepository.find({
      where: { user: { id: req.user.id } },
    });
    res.status(200).json(
      tasks.map((task) => ({
        id: task.id,
        done: task.done,
        title: task.title,
      }))
    );
  }
});

tasksRouter.post(
  "/create",
  [verifyJWT],
  async (req: Request, res: Response) => {
    if (req.user) {
      const taskTitle: string | undefined = req.body.title;
      if (taskTitle)
        if (taskTitle.trim().length) {
          const tasksRepository = await getRepository(Tasks);
          const usersRepository = await getRepository(Users);
          const user = await usersRepository.findOne(req.user.id);
          if (user) {
            const task = new Tasks();
            task.title = taskTitle;
            task.user = user;
            await tasksRepository.save(task);
            res.status(201).send("Success");
          }
        } else res.status(400).send("Task is empty!");
      else res.status(400).send("Task is empty!");
    }
  }
);

tasksRouter.post(
  "/delete/:id",
  [verifyJWT],
  async (req: Request, res: Response) => {
    if (req.params.id) {
      if (req.user) {
        const tasksRepository = await getRepository(Tasks);
        const task = await tasksRepository.findOne(req.params.id);
        if (task) {
          await tasksRepository.delete({ id: task.id });
          res.send("Success");
        } else res.status(404).send("Could not find task");
      }
    } else res.status(404);
  }
);

tasksRouter.post(
  "/edit/:id",
  [verifyJWT],
  async (req: Request, res: Response) => {
    if (req.params.id) {
      if (req.user) {
        const taskTitle: string | undefined = req.body.title;
        const done: boolean | undefined = req.body.done;
        if (taskTitle && done !== undefined)
          if (taskTitle.trim().length) {
            const tasksRepository = await getRepository(Tasks);
            const task = await tasksRepository.findOne(req.params.id);
            if (task) {
              task.done = done;
              task.title = taskTitle;
              tasksRepository.save(task);
              res.send("Success");
            } else res.status(404).send("Could not find task.");
          } else res.status(400).send("Task is empty.");
        else res.status(400).send("Task details not provided.");
      }
    } else res.status(404);
  }
);

export default tasksRouter;
