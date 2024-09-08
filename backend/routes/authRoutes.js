const express = require('express');
const { registerUser, authUser,getEnrolledCourses, markCourseAsCompleted } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/enrolled',getEnrolledCourses);
router.get('/courses/:courseId/complete', markCourseAsCompleted);


module.exports = router;
