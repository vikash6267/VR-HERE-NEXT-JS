const bcrypt = require("bcryptjs");
const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");



const registerCtrl = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;

    if (!name || !email || !password || !contact) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authModel.create({
      name,
      email,
      password: hashedPassword,
      contact,
      role
    });

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // Set cookie for token
    const options = {
      httpOnly: true,
    };
    res.cookie("token", token, options);




    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};


const subscribe = async (req, res) => {
  try {
    const { userId, months } = req.body;

    // Calculate the expiry date
    const startDate = new Date();
    const expiryDate = new Date(startDate.setMonth(startDate.getMonth() + months));

    // Find the user and update subscription details
    const user = await authModel.findByIdAndUpdate(
      userId,
      {
        subscription: {
          startDate,
          expiryDate,
          months,
          isActive: true,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Subscription successful',
      expiryDate: user.subscription.expiryDate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Subscription failed',
      error: error.message,
    });
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET
      );

      user.token = token;
      user.password = undefined;
      const options = {
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Email & Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};


const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authModel.findById(id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error in getting vendor",
    });
  }
};


module.exports = { registerCtrl, loginCtrl, subscribe, getVendorById };
