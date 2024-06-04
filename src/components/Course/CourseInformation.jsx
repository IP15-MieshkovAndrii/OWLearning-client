import React, { useState } from "react";

const CourseInformation = ({courseInfo, setCourseInfo, active, setActive}) => {

    const [dragging, setDragging] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setActive(active+1);
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if(reader.readyState === 2) {
                    setCourseInfo({...courseInfo, thumbnail: reader.result})
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    }


    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];

        if(file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setCourseInfo({...courseInfo, thumbnail: reader.result})    
            }
            reader.readAsDataURL(file);
        }

    }


    return (
        <div className="w-80 m-auto mt-24 pb-5">
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="course-label w-600">
                    Course name
                </label>
                <input
                    type="name"
                    className="course-input"
                    name="name"
                    required
                    value={courseInfo.name}
                    onChange={(e) => setCourseInfo({...courseInfo, name: e.target.value})}
                    id="name"
                    placeholder="MERN stack LMS platform with next 13"
                />
            </div>
            <br/>
            <div className="mb-5">
                <label htmlFor="" className="course-label w-600">
                    Course Description
                </label>
                <textarea
                    className="course-input py-2 h-min"
                    name=""
                    required
                    cols={30}
                    rows={10}
                    value={courseInfo.description}
                    onChange={(e) => setCourseInfo({...courseInfo, description: e.target.value})}
                    id="description"
                    placeholder="Write something amazing..."
                />
            </div>
            <br/>

            <div>
                <label htmlFor="" className="course-label w-600">
                    Course Tags
                </label>
                <input
                    type="text"
                    className="course-input"
                    name=""
                    required
                    value={courseInfo.tags}
                    onChange={(e) => setCourseInfo({...courseInfo, tags: e.target.value})}
                    id="tags"
                    placeholder="MERN, Next, Socket io, LMS"
                />
            </div>

            <div className="w-full flex justify-between">
                <div className="w-45">
                    <label htmlFor="level" className="course-label w-600">
                        Course Level
                    </label>
                    <input
                        type="text"
                        className="course-input"
                        name="level"
                        required
                        value={courseInfo.level}
                        onChange={(e) => setCourseInfo({...courseInfo, level: e.target.value})}
                        id="level"
                        placeholder="Beginner/Intermediate/Expert"
                    />
                </div>
                <div className="w-50">
                    <label htmlFor="demoUrl" className="course-label w-50 ">
                        Demo URL
                    </label>
                    <input
                        type="text"
                        className="course-input"
                        name="demoUrl"
                        required
                        value={courseInfo.demoUrl}
                        onChange={(e) => setCourseInfo({...courseInfo, demoUrl: e.target.value})}
                        id="demoUrl"
                        placeholder="eer74fd"
                    />
                </div>
            </div>

            <br/>

            <div className="w-full">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <label htmlFor="file"
                    className={` min-h-10vh width-100-3 p-3 border flex items-center justify-center  pointer rounded
                    ${dragging ? " bg-blue-500": "bg-transparent"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                {courseInfo.thumbnail ? (
                    <img
                        src={courseInfo.thumbnail}
                        alt=""
                        className="max-h-full w-full object-cover"
                    />) : (
                    <span className="text-black">
                        Drag and drop your thumbnail here or click to browse
                    </span>
                )}

                </label>
            </div>
            <br/>
            <div className="w-full flex items-center justify-end">
                <input
                    type="submit"
                    value="Next"
                    className="w-full w-180 h-40 bg-37a39a text-center text-fff rounded mt-8 pointer mr-1"
                />
            </div>

            </form>
        </div>
    );
};

export default CourseInformation;
