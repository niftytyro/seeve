import express from "express";
import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import { __jwt_secret__ } from "../constants";
import { Users } from "../entities/users";
import { getGoogleProfile, googleAuthUrl } from "./google-utils";

const googleRouter = express.Router();

googleRouter.get("/google/login", (_, res) => {
  console.log(googleAuthUrl);

  res.status(303).redirect(googleAuthUrl);
});

googleRouter.get("/google/callback", async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).send("Code not provided.");

  const userData = await getGoogleProfile(code);
  if (!userData) return res.status(401).send("Please provide a valid code.");

  const connection = getConnection();
  let user = await connection.manager.findOne(Users, {
    where: { email: userData.email },
  });
  if (!user) {
    try {
      user = await connection.manager.create(Users, {
        email: userData.email,
        name: userData.name,
      });
      connection.manager.save(user);
    } catch (e) {
      return res.status(400).send("User already exists.");
    }
  }
  const token = jwt.sign({ id: user.id }, __jwt_secret__);
  return res.status(200).send(token);
});

export default googleRouter;
