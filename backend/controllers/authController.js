import User from "../database/models/userModel.js";
import bcrypt from "bcrypt";

export function login(req, res) {
  const { username, password,userType } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });
        const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Ensure secure cookie in production
          sameSite: "Strict", // Prevent CSRF attacks
          
        };

        return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({ message: "Login successful",username:user.username,userType:user.userType,isAdmin:user.isAdmin });
      }
      return res.status(400).json({ message: "Authentication Failed" });
    });
  });
}
export function register(req, res) {
  const { username, email, password,userType } = req.body;
const hashedPassword = bcrypt.hashSync(password, 10);

if (!username || !email || !password ) {
  return res.status(400).json({ message: "Please fill in all fields" });
}

User.findOne({ username }).then((user) => {
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword, 
    userType: userType,
  });

  newUser.save().then((user) => {
    // Exclude the password field from the saved user object
    User.findById(user._id).select('-password').then((userWithoutPassword) => {
      return res.status(200).json({ message: "User created", data: { user: userWithoutPassword } });
    });
  });
});

}
export async function logout(req, res) {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "Logged out" });
}
