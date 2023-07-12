import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { BadRequestError, NotAuthorizedError } from '../errors';
import { User } from '../models/user';
import { Password } from '../services/password';
import {
  ROOT_EMAIL,
  ROOT_ID,
  ROOT_PASSWORD,
  ROOT_USERNAME,
} from '../config/envs';

const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUsername = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });

  if (existingUsername) {
    throw new BadRequestError('Username in use');
  }

  if (existingEmail) {
    throw new BadRequestError('Email in use');
  }

  const user = User.build({ username, email, password });
  await user.save();

  //Generate JWT
  const userJwt = Jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  //Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).json(user);
};

const signin = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const userRoot = {
    id: ROOT_ID,
    username: ROOT_USERNAME,
    email: ROOT_EMAIL,
    password: ROOT_PASSWORD,
  };

  let user;
  let passwordMatch;
  if (!email) {
    user = await User.findOne({ username });
  } else {
    user = await User.findOne({ email });
  }

  if (!user) {
    if (email === userRoot.email || username === userRoot.username) {
      user = userRoot;
      passwordMatch = await Password.compare(user.password, password);
    } else {
      throw new BadRequestError('User not found');
    }
  } else {
    passwordMatch = await Password.compare(user.password, password);
  }

  if (!passwordMatch) {
    throw new NotAuthorizedError();
  }

  const userJwt = Jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_KEY!
  );

  req.session = { jwt: userJwt };

  res.json(user);
};

const signout = (req: Request, res: Response) => {
  req.session = null;
  res.json({});
};

const currentUser = (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
};

export default {
  signup,
  signin,
  signout,
  currentUser,
};
