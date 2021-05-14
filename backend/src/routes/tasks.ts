import express, { Request, Response } from "express";
import { Tasks } from "../entities/Tasks";
import { verifyJWT } from "../middlewares/verifyJwt";
import { getRepository } from "typeorm";

const tasksRouter = express.Router();

tasksRouter.get("/", [verifyJWT], async (req: Request, res: Response) => {
  if (req.user) {
    const tasksRepository = getRepository(Tasks);
    const tasks = await tasksRepository.find({
      where: { user: { id: req.user.id } },
    });
    res.status(200).json(tasks);
  }
});

export default tasksRouter;
