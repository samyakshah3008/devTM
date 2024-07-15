import { signUpService } from "../services/user.service.js";

const signUpController = async (req, res, next) => {
  const { username, firstName, lastName, password } = req.body;

  try {
    const response = await signUpService(
      username,
      firstName,
      lastName,
      password
    );
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }

    return res
      .status(500)
      .json({ message: "internal server error while registering a user" });
  }
};

export { signUpController };
