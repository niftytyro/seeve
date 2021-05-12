import express from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { __jwt_secret__ } from "../constants";
import { Users } from "../entities/users";
import { getGoogleProfile, googleAuthUrl } from "./google-utils";

const googleRouter = express.Router();

googleRouter.get("/google/login", (_, res) => {
  res.status(200).send(googleAuthUrl);
});

googleRouter.get("/google/callback", async (req, res) => {
  const code = req.query.code;
  if (typeof code === "string") {
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
    res.cookie("jwt", token);
    return res.status(303).redirect("http://localhost:3000");
  } else {
    res.status(400);
  }
});

export default googleRouter;
