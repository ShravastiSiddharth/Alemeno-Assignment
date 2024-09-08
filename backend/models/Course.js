const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    enrollmentStatus: { type: String, required: true, enum:['Open', 'Closed', 'In Progress'] },
    thumbnail: { type: String },
    duration: { type: Number },
    schedule: { type: String },
    location: { type: String },
    prerequisites: [String],
    syllabus: [
        {
            week: Number,
            topic: String,
            content: String
        }
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

 
module.exports =mongoose.model('alemenoCourse', courseSchema);
