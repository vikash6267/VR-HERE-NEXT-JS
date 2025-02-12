const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authModel = require("../models/authModel");
const userModel = require("../models/userModel")
dotenv.config();

const auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");


		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			req.user = decode;
		} catch (error) {
			console.log(error)
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};


const isUser = async (req, res, next) => {
	try {
		const userDetails = await userModel.findOne({ email: req.user.email });
		if (userDetails?.role !== "user") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for User",
			});
		}
		next();
	} catch (error) {
		console.log(error)
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

const isVendor = async (req, res, next) => {
	try {
		const userDetails = await authModel.findOne({ email: req.user.email });

		if (userDetails.role !== "vendor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for vendor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `Vendor Role Can't be Verified` });
	}
};


const isAdmin = async (req, res, next) => {
	try {
		const userDetails = await authModel.findOne({ email: req.user.email });

		if (userDetails.role !== "admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `Admin Role Can't be Verified` });
	}
};



module.exports = { auth, isVendor, isAdmin, isUser }

