import React, { useEffect, useState } from "react";
import "../Teacher.scss"; 
import "./CreateCourse.scss"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CourseInformation from "../../../components/Course/CourseInformation";
import CourseOptions from "../../../components/Course/CourseOptions";
import CourseContent from "../../../components/Course/CourseContent";
import CoursePreview from "../../../components/Course/CoursePreview";
import api from "../../../utils/axiosConfig";

const CreateCourse = () => {
    const userFromState = useSelector(state => state.auth.user);
    const [user, setUser] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        thumbnail: "",
        tags: "",
        level: "",
        demoUrl:"",
    });

    const [courseContentData, setCourseContentData] = useState([{
        videoUrl: "",
        title: "",
        videoSection: "Untitled Section",
        text: "",
        videoLength: "",
        videoPlayer: "",
        links: [{
            url: "",
            title: "",
        },
        ],
        tests: [],
    }]);

    const [courseData, setCourseData] = useState({})

    useEffect(() => {
        if (!userFromState) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user')));
            // if(user?.role !== 'teacher') {
            //     navigate('/');
            // }

        }
    }, [userFromState, navigate, user?.role]);



    const handleSubmit = async() => {
        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            videoSection: courseContent.videoSection,
            text: courseContent.text,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            }))
        }));

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            thumbnail: courseInfo.thumbnail,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl:courseInfo.demoUrl,
            totalLessons: courseContentData.length,
            courseData: formattedCourseContentData,
            teacherId: JSON.parse(userFromState)._id,
        }

        setCourseData(data);

    }

    const handleCourseCreate = async() => {
        const data = courseData;
        
        const response = await api.post('/create-course', data);
        if (response){
            sessionStorage.removeItem('/all-courses');
            navigate('/teacher/all-courses')
        }
    }

    return (
        <div className="teacher course">
            <Sidebar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible}/>
            <div className={`sidebar-menu `} onClick={()=>setIsSidebarVisible('true')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>

            <div className="w-80">
            {
                active === 0 && (
                    <CourseInformation 
                        courseInfo={courseInfo} setCourseInfo={setCourseInfo}
                        active={active} setActive={setActive}
                    />
                )
            }

            {
                active === 1 && (
                    <CourseContent
                        courseContentData={courseContentData} setCourseContentData={setCourseContentData}
                        active={active} setActive={setActive} handleSubmit={handleSubmit}
                    />
                )
            }

            {
                active === 2 && (
                    <CoursePreview
                        courseData={courseData} handleCourseCreate={handleCourseCreate} setActive={setActive} active={active} handleSubmit={handleSubmit}
                        
                    />
                )
            }

            </div>

            <div className="w-20 mt-100 h-screen fixed top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>



        </div>
    );
};

export default CreateCourse;
