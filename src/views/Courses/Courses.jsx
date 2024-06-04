import React, { useEffect, useState } from 'react';
import './Courses.scss';
import api from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const cachedCourses = sessionStorage.getItem("available-courses");
            if (cachedCourses) {
                const coursesData = JSON.parse(cachedCourses).map(course => ({
                    id: course._id,
                    thumbnail: course.thumbnail,
                    title: course.name,
                    lessons: course.courseData.length,
                    level: course.level,
                }));
                setCourses(coursesData);
            } else {
                try {
                    const response = await api.get('/get-my-courses');

                    const coursesData = response.data.courses.map(course => ({
                        id: course._id,
                        thumbnail: course.thumbnail,
                        title: course.name,
                        lessons: course.courseData.length,
                        level: course.level,
                    }));
                    setCourses(coursesData);
                    sessionStorage.setItem("available-course", JSON.stringify(response.data.courses));
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            }
        };

        fetchCourses();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/course/${id}`);
    };
    return (
        <div className="courses-page">
            <div className="intro-text">
                <h1>Welcome to Our Courses</h1>
                <p>Explore our wide range of courses and find the perfect one for you. We offer a variety of topics and levels to cater to your learning needs.</p>
            </div>
            <div className="courses-container">
                {courses.map((course, index) => (
                    <div key={index} className="course-card" onClick={() => handleCardClick(course.id)}>
                        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                        <h2 className="course-title">{course.title}</h2>
                        <p className="course-info">{course.level} Level</p>
                        <p className="course-info">{course.lessons} Lessons</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
