const express = require('express');
const { getCourses, getCourseById, enrollCourse } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/enroll/:courseId', protect, enrollCourse);

module.exports = router;
