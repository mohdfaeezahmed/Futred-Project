import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../jwt/jwt.utils.js";

export const home = (req, res) => {
  res.send("Home!");
};

export const signup = async (req, res) => {
  const { firstName,lastName,email, password } = req.body;

  try {
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be of 8 charchters:" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already present." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPass,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      });
      console.log("User created successfully!");
    } else {
      res.status(400).json({ message: "Invalid user data:" });
    }
  } catch (err) {
    console.log("Error in singup contoller : ", err.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        generateToken(user._id, res);
        res.status(201).json({
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          lastName : user.lastName,
          password: user.password,

        });
      } else {
        res.status(400).json({ message: "Invalid Password:" });
      }
    } else {
      res.status(400).json({ message: "Invalid user data:" });
    }
  } catch (err) {
    console.log("Error in singup contoller : ", err.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "Logout Successfully !" });
  } catch (err) {
    console.log("Error in singup contoller : ", err.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const employee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ username: req.params.username });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// export const updateRoute = async (req, res) => {
//   try {
//     const { profilePic } = req.body;
//     if (!profilePic) {
//       return res.status(400).json({ message: "Profile Pic is Required!" });
//     }
//     const user = req.user;
//     const newProfilePic = await cloudinary.uploader.upload(profilePic);
//     const updatedUser = await findByIdAndUpdate(
//       user._id,
//       { profilePic: newProfilePic.secure_url },
//       { new: true }
//     );

//     res.status(200).json(updatedUser);
//   } catch (err) {
//     console.log("Error in singup contoller : ", err.message);
//     res.status(500).json({ message: "Internal server error!" });
//   }
// };

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in singup contoller : ", err.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
