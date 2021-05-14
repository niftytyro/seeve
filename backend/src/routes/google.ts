import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConnection, getRepository } from "typeorm";
import { __cookie_options__, __jwt_secret__ } from "../constants";
import { Users } from "../entities/Users";
import axios from "axios";
import { google } from "googleapis";
import {
  __google_client_id__,
  __google_client_secret__,
  __google_redirect_uri__,
} from "../constants";
import { verifyJWT } from "../middlewares/verifyJwt";

const oAuthClient2 = () => {
  return new google.auth.OAuth2(
    __google_client_id__,
    __google_client_secret__,
    __google_redirect_uri__
  );
};

const oAuthClient = oAuthClient2();

const getAuthUrl = (): string => {
  return oAuthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["profile", "email"],
  });
};

export const googleAuthUrl = getAuthUrl();

export const getGoogleProfile = async (code: string) => {
  try {
    const { tokens } = await oAuthClient.getToken(code);
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    );
    return { name: googleUser.data.name, email: googleUser.data.email };
  } catch (e) {
    return undefined;
  }
};

const googleRouter = express.Router();

googleRouter.get("/me", [verifyJWT], async (req: Request, res: Response) => {
  if (req.user) {
    const usersRepository = await getRepository(Users);
    const user = await usersRepository.findOne(req.user.id);
    if (user) {
      res.json({
        email: user.email,
        id: user.id,
        name: user.name,
      });
    } else res.status(404).send("User does not exist.");
  }
});

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
    res.cookie("jwt", token, __cookie_options__);
    return res.status(303).redirect("http://localhost:3000");
  } else {
    res.status(400);
  }
});

export default googleRouter;
