import React, { useState } from "react";
import {AiOutlineDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {BsLink45Deg, BsPencil} from "react-icons/bs";


const CourseContent = ({courseContentData, setCourseContentData, active, setActive, handleSubmit: handleCourseSubmit}) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleCollapseToggle = (index) => {
        const updateCollapsed = [...isCollapsed];
        updateCollapsed[index] = !updateCollapsed[index];
        setIsCollapsed(updateCollapsed);
    }

    const handleRemoveLink  = (index, linkIndex) =>{
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex,1);
        setCourseContentData(updatedData);
    } 


    const handleAddLink = (index) =>{
        const updatedData = [...courseContentData];
        updatedData[index].links.push({title: "", url: ""});
        console.log(updatedData[index].links)
        setCourseContentData(updatedData);
    } 

    const newContentHandler = (item) => {
        if(item.title === ""){
            alert("Please fill title field first!")
        } else {
            let newVideoSection = "";
            if(courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length-1].videoSection;

                if(lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            const newContent = {
                videoUrl: "",
                title: "",
                videoSection: newVideoSection,
                text: "",
                videoLength: "",
                videoPlayer: "",
                links: [{
                    url: "",
                    title: "",
                },
                ],
                tests: [],
            };

            setCourseContentData([...courseContentData, newContent])
        }
    }

    const addNewSection = ()  => {
        if(
            courseContentData[courseContentData.length - 1].title === ""
        ) {
            alert("Please fill title field first!")
        } else {
            setActiveSection(activeSection + 1)
            const newContent = {
                videoUrl: "",
                title: "",
                videoSection: `Untitled Session ${activeSection}`,
                text: "",
                videoLength: "",
                videoPlayer: "",
                links: [{
                    url: "",
                    title: "",
                },
                ],
                tests: [],
            };

            setCourseContentData([...courseContentData, newContent])
        }
    }

    const prevButton = () => {
        setActive(active-1)
    }

    const handleOptions = () => {
        if(
            courseContentData[courseContentData.length - 1].title === ""
        ) {
            alert("Please fill title field first!")
        } else {
            setActive(active+1);
            handleCourseSubmit();
        }

    }
    



    return (
        <div className="w-80 m-auto mt-24 p-3 pb-5">
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item, index) => {
                    const showSectionInput =
                    index === 0 || 
                    item.videoSection !== courseContentData[index-1].videoSection;

                    return (
                        <>
                            <div className={`w-full bg-cdc8c817 p-4 ${showSectionInput ? 'mt-10' : 'mb-0'}`}>

                                {
                                    showSectionInput && (
                                        <>
                                            <div className="flex w-full items-center">
                                                <input type="text"
                                                    className={`text-20px ${
                                                        item.videoSection === "Untitled Section"
                                                        ? "w-170" : "w-min"
                                                    } pointer text-white bg-transparent outline-none`}
                                                    value={item.videoSection}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoSection = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                                <BsPencil className="pointer text-black"/>
                                            </div>
                                        </>

                                    )
                                }
                                <div className="flex w-full items-center justify-between my-0">
                                    {isCollapsed[index] ? (
                                        <>
                                            {item.title ? (
                                                <p className="font-Poppins text-black">
                                                   {index + 1}.{item.title}
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <div></div>
                                    )}

                                    <div className="flex items-center justify-end">
                                        <AiOutlineDelete
                                            className={`text-20px mr-2 text-black ${index>0 ? "pointer" : "no-drop"}`}
                                            onClick={() => {
                                                if(index>0) {
                                                    const updateData = [...courseContentData];
                                                    updateData.splice(index,1);
                                                    setCourseContentData(updateData);
                                                }
                                            }}
                                        />
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className="text-black"
                                            style={{
                                                transform: isCollapsed[index] 
                                                    ?  "rotate(180deg)"
                                                    :  "rotate(0deg)"
                                            }}
                                            onClick={() => handleCollapseToggle(index)}
                                        />
                                    </div>
                                </div>

                                {
                                    !isCollapsed[index] && (
                                        <>
                                            <div className="my-3  w-full">
                                                <label className="course-label  w-full pt-1">Lecture Title</label>
                                                <input type="text"
                                                    className={`course-input w-full`}
                                                    placeholder="Project Plan"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].title = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                            </div>
                                            <div className="my-3  w-full">
                                                <label className="course-label  w-full pt-1">Video Url</label>
                                                <input type="text"
                                                    className={`course-input w-full`}
                                                    placeholder="sdder"
                                                    value={item.videoUrl}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoUrl = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                            </div>
                                            <div className="my-3  w-full">
                                                <label className="course-label  w-full pt-1 underline">Lecture Material</label>
                                                <textarea 
                                                    rows={8}
                                                    cols={30}
                                                    className={`course-input w-full py-2`}
                                                    placeholder="What is lesson about?"
                                                    value={item.text}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].text = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />

                                                <br/>
                                            </div>
                                            {
                                                item?.links.map((link, linkIndex) => {
                                                    return (
                                                        <div  className="my-3 w-full">
                                                            <div className="w-full flex items-center justify-between">
                                                                <label className="course-label w-full">
                                                                    Link {linkIndex + 1}
                                                                </label>
                                                                <AiOutlineDelete
                                                                    className={`${
                                                                        linkIndex === 0 
                                                                        ? "no-drop"
                                                                        : "pointer"
                                                                    } text-black text-20px`}
                                                                    onClick={() => 
                                                                        linkIndex === 0
                                                                        ? null
                                                                        : handleRemoveLink(index, linkIndex)
                                                                    }
                                                                />
                                                            </div>
                                                            <input type="text"
                                                                className={`course-input w-full`}
                                                                placeholder="Source Code... (Link title)"
                                                                value={link.title}
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].title = e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }}
                                                            />
                                                            <input type="text"
                                                                className={`course-input w-full`}
                                                                placeholder="Source Code Url... (Link Url)"
                                                                value={link.url}
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].url = e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }}
                                                            />
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                             <br />

                                            <div className="inline-block mb-4">
                                                <p 
                                                    className="flex items-center text-18px text-black pointer"
                                                    onClick={()=>handleAddLink(index)}>
                                                        <BsLink45Deg className="mr-2"/> Add Link
                                                    </p>
                                            </div>
                                        </>
                                    )
                                }
                                <br/>
                                {index === courseContentData.length - 1 && (
                                    <div>
                                        <p
                                            className="flex items-center text-18px text-black pointer"
                                            onClick={(e)=>newContentHandler(item)}>

                                        <AiOutlinePlusCircle className="mr-2"/>Add New Lesson
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                })}
                <br/>
                <div className="flex items-center text-20px text-black pointer"
                    onClick={()=>addNewSection()}>

                    <AiOutlinePlusCircle className="mr-2"/>Add New Session

                </div>
            </form>
            <br/>
            <div className="w-full flex items-center justify-between ">
                <div
                    className="w-full w-180 h-40 bg-37a39a text-center text-fff rounded mt-8 pointer mr-1 flex justify-center items-center"
                    onClick={()=>prevButton()}
                >Prev
                </div>
                <div
                    className="w-full w-180 h-40 bg-37a39a text-center text-fff rounded mt-8 pointer mr-1 flex justify-center items-center "
                    onClick={()=>handleOptions()}
                >Next
                </div>
            </div>


        </div>
    );
};

export default CourseContent;
