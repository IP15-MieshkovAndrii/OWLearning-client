/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/axiosConfig';
import './CourseDetails.scss';
import CourseContentList from '../../components/Course/CourseContentList';
import { useSelector } from "react-redux";


const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    let user = useSelector(state => state.auth.user);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await api.get(`/get-single-course/${id}`);
                setCourse(response.data.course);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [id]);

    const renderVideo = (url) => {
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);
        const videoId = match ? match[1] : null;

        if (videoId) {
            return (
                <iframe
                    className="course-video"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={course.name}
                ></iframe>
            );
        }

        return (
            <video controls className="course-video">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    };

    return (
        <div className="scourse-details">
            <div className="scourse-content">
                <div className="scourse-main">
                    {course && (
                        <>
                            <h1 className="scourse-title">{course.name}</h1>
                            <div className="scourse-overview">
                                <h1>Course Overview</h1>
                                <CourseContentList data={course.courseData} isDemo={true} />
                            </div>
                            <div className="scourse-description">
                                <h1>Course Details</h1>
                                <p>{course.description}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="scourse-sidebar">
                    {course && (
                        <div className="video-container">
                            {renderVideo(course.demoUrl)}

                            {
                                user && (
                                    <div className="enter-course">
                                        <Link to={`/course-access/${course._id}`} className="enter-button">
                                            Enter to Course
                                        </Link>
                                    </div>
                                )
                            }

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
