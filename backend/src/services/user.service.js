import { signUpBody } from "../lib/zod/user-validation.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error,
      "Something went wrong while generating access and refreshing tokens"
    );
  }
};

const signUpService = async (username, firstName, lastName = "", password) => {
  if (!username) {
    throw new ApiError(400, { error: "Username is required" });
  }

  if (!firstName) {
    throw new ApiError(400, { error: "First name is required" });
  }

  if (!password) {
    throw new ApiError(400, { error: "Password is required" });
  }

  const { success } = signUpBody.safeParse({
    username,
    firstName,
    lastName,
    password,
  });

  if (!success) {
    return new ApiError(411, {
      message: "Email already taken / Incorrect inputs: ZOD Validation failed",
    });
  }

  const findRegisteredUserWithUsername = await User.findOne({ username });

  if (findRegisteredUserWithUsername) {
    return new ApiResponse(200, {
      redirect: true,
      flow: "signup",
      message: "Account already exists",
    });
  }

  const newUser = await User.create({
    username,
    firstName,
    lastName,
    password,
  });

  const registeredUser = await User.findById(newUser._id).select(
    "-refreshToken"
  );

  if (!registeredUser) {
    throw new ApiError(500, {
      error: "Something went wrong while registering user.",
    });
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    registeredUser._id
  );

  return new ApiResponse(
    201,
    { accessToken, refreshToken },
    "User created successfully. "
  );
};

export { signUpService };
