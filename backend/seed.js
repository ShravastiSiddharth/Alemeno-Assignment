require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Correct import of faker
const Course = require('./models/Course'); 

const connectDB = require('./config/db');
connectDB();

const seedCourses = async () => {
    try {
        // Delete all existing entries
        await Course.deleteMany();

        // Generate 80 courses
        for (let i = 0; i < 80; i++) {
            const course = new Course({
                name: faker.company.catchPhrase(),
                instructor: faker.person.fullName(),
                description: faker.lorem.paragraph(),
                enrollmentStatus: faker.helpers.arrayElement(['Open', 'Closed', 'In Progress']),
                thumbnail: faker.image.urlPicsumPhotos(),
                duration: faker.number.int({ min: 5, max: 100 }), // Random hours between 5 and 100
                schedule: `${faker.date.weekday()}s, ${faker.number.int({ min: 1, max: 12 })}:00 PM - ${faker.number.int({ min: 1, max: 12 })}:00 PM`,
                location: faker.location.city(),
                prerequisites: [faker.lorem.words(3), faker.lorem.words(3)],
                syllabus: [
                    { week: 1, topic: faker.lorem.words(5), content: faker.lorem.paragraph() },
                    { week: 2, topic: faker.lorem.words(5), content: faker.lorem.paragraph() },
                    { week: 3, topic: faker.lorem.words(5), content: faker.lorem.paragraph() }
                    // Add more weeks/topics if needed
                ],
                students: [] // Initially no students enrolled
            });

            await course.save();
        }

        console.log('80 Courses seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        mongoose.connection.close();
    }
};

seedCourses();
