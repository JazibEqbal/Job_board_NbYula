import User from "../models/Users.js";
import { StatusCodes } from "http-status-codes";
import gravatar from "gravatar";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide all values" });
    }
    //If user already exists
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email already exists" });
    }
    //Avatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const user = await User.create({ name, email, password, avatar });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        location: user.location,
        avatar,
      },
      token,
      location: user.location,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "All fields are required *" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Wrong email or password" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Wrong email or password" });
    }
    const token = user.createJWT();
    user.password = undefined;

    res.status(StatusCodes.OK).json({
      user,
      location: user.location,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res) => {
  const { email, name, location } = req.body;
  if (!email || !name || !location) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Please provide all values to update");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.location = location;
  //
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, update };
