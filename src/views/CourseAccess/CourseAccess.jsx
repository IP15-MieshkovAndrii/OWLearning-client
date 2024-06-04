import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import styles from './CourseAccess.module.scss'; 
import api from "../../utils/axiosConfig";
import CourseContentList from "../../components/Course/CourseContentList";

const CourseAccess = () => {
    const [activeBar, setActiveBar] = useState(0);
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
        try {
            const response = await api.get(`/get-single-course/${id}`);
            setData(response.data.course.courseData);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
        };

        fetchCourseDetails();
    }, [id]);

    const [activeVideo, setActiveVideo] = useState(0);

    const renderVideo = (videoUrl) => {
        return <video src={videoUrl} controls />;
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {data[activeVideo].title}
            </h1>

            {
                data[activeVideo]?.videoUrl && renderVideo(data[activeVideo]?.videoUrl)
            } 
            <br/>
            <br/>
            <br/>


            <div className={styles.tabContainer}>
                {["Overview", "Resources"].map((text, index) => (
                <h5
                    key={index}
                    className={`${styles.tab} ${activeBar === index ? styles.activeTab : ''}`}
                    onClick={() => setActiveBar(index)}
                >
                    {text}
                </h5>
                ))}
            </div>
            {activeBar === 0 && (
                <p className={styles.description}>
                {data[activeVideo]?.text}
                </p>
            )}
            {activeBar === 1 && (
                <div>
                {data[activeVideo]?.links.map((item, index) => (
                    <div className={styles.linkContainer} key={index}>
                    <h2 className={styles.linkTitle}>
                        {item.title && item.title + " :"}
                    </h2>
                    <a className={styles.link} href={item.url}>
                        {item.url}
                    </a>
                    </div>
                ))}
                </div>
            )}

            <div className={styles.navigation}>
                <div
                    className={`${styles.button} ${activeVideo === 0 ? styles.disabled : ''}`}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    <AiOutlineArrowLeft className={styles.icon} />
                    Prev Lesson
                </div>
                <div
                    className={`${styles.button} ${data.length - 1 === activeVideo ? styles.disabled : ''}`}
                    onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                >
                    Next Lesson
                    <AiOutlineArrowRight className={styles.icon} />
                </div>
            </div>
            <div className={styles.overview}>
                <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
                />
            </div>
            
        </div>
        
    );
};

export default CourseAccess;
