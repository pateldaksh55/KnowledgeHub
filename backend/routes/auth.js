// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

const router = express.Router();

// 📝 Sign Up
router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const Model = role === "teacher" ? Teacher : Student;

    const existingUser = await Model.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: `${role} already exists` });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({ fullName, email, password: hashedPassword });
    await newUser.save();

    // ✅ Save user in session
    req.session.userId = newUser._id;
    req.session.fullName = newUser.fullName;
    req.session.role = role;

    res.status(201).json({
      message: `${role} registered successfully`,
      user: { id: newUser._id, fullName: newUser.fullName, role },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during sign-up", error: err.message });
  }
});

// 📝 Login
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const Model = role === "teacher" ? Teacher : Student;

    const user = await Model.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // ✅ Save user to session
    req.session.userId = user._id;
    req.session.fullName = user.fullName;
    req.session.role = role;

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, role },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});

// 📝 Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// 📝 Get Current User
router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.json({ isAuthenticated: false, user: null });
  }
  res.json({
    isAuthenticated: true,
    user: {
      id: req.session.userId,
      fullName: req.session.fullName,
      role: req.session.role,
    },
  });
});

export default router;
