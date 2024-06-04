import React from "react";


const CoursePreview = ({courseData, handleCourseCreate, setActive, active}) => {

    const prevButton = () => {
        setActive(active-1)
    }

    const createCourse = () => {
        handleCourseCreate();
    }



    return (
        <div className="w-600 m-auto py-5 mb-5">

        <div className="w-80 flex items-center justify-between ">
                <div
                    className="w-80 w-180 h-40 bg-37a39a text-center text-fff rounded mt-8 pointer mr-1 flex justify-center items-center"
                    onClick={()=>prevButton()}
                >Prev
                </div>
                <div
                    className="w-full w-180 h-40 bg-37a39a text-center text-fff rounded mt-8 pointer mr-1 flex justify-center items-center "
                    onClick={()=>createCourse()}
                >Create
                </div>
        </div>

        </div>
    );
};

export default CoursePreview;
