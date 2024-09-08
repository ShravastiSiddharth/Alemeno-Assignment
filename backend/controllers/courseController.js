const Course = require('../models/Course');

const getCourses = async (req, res) => {
    const courses = await Course.find({});
    res.json(courses);
};

const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

const enrollCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
        const AlredayEnrolled = course.students.find(studentId => studentId.toString() === req.user._id.toString());
        if(AlredayEnrolled){
               return     res.status(400).json({message:'Already Enrolled in Course'})
        }
        course.students.push(req.user._id);
        await course.save();
        req.user.enrolledCourses.push(course._id);
        await req.user.save();
        res.status(201).json({ message: 'Course enrolled successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

module.exports = { getCourses, getCourseById, enrollCourse };
