const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.login = async(req, res) => { 
      try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid credentials" });
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id},
        process.env.SECRET, // Use a secure key in production
        
        {
          httpOnly: true,
        secure: true, // Ensure this is true in production
        sameSite: 'Strict', // Prevent cross-site request forgery
           expiresIn: "2h" } // Token expiry
      );
  
      res.status(200).cookie("jwt", token).json({success:true,  token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }}


module.exports.signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};
