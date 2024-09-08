const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course')
const mongoose = require('mongoose');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3hr',
    });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
           
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};
  
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
           
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const getEnrolledCourses = async (req, res) => {
    // 1. Check if the Authorization header is present
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        // 2. Directly use the token from the 'Authorization' header
        const token = req.headers.authorization;  // No need to split

        // 3. Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // 4. Find the user and populate the enrolledCourses (which contains course IDs)
        const user = await User.findById(userId).populate('enrolledCourses');

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 5. Find the full details of each enrolled course using the course IDs from the user object
        const courses = await Course.find({ _id: { $in: user.enrolledCourses } });

        // 6. Return the full details of the enrolled courses
        res.json({
            success: true,
            enrolledCourses: courses
        });

    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token', er: { error } });
        } else {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

const markCourseAsCompleted = async (req, res) => {
    try {
        // Get the JWT token from the headers
        const token = req.headers.authorization;

        // If no token is provided, return an error
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token and extract user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Assuming the token contains the user ID

        // Get the course ID from the URL
        const { courseId } = req.params;

        // Validate if courseId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID' });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the enrolled course
        const enrolledCourse = user.enrolledCourses.find(course => course.course.toString() === courseId);

        // If the course is not found in the user's enrolled courses, return an error
        if (!enrolledCourse) {
            return res.status(404).json({ message: 'Course not found in enrolled courses' });
        }

        // Mark the course as completed
        enrolledCourse.completed = true;

        // Save the updated user data
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Course marked as completed successfully' });

    } catch (error) {
        // Handle JWT token errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Handle token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        // Handle all other errors
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
module.exports = { registerUser, authUser, getEnrolledCourses, markCourseAsCompleted };
