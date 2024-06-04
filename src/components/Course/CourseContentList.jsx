import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import "./CourseContentList.scss";

const CourseContentList = (props) => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  const videoSections = [
    ...new Set(props.data?.map((item) => item.videoSection)),
  ];

  let totalCount = 0;

  const toggleSection = (section) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div className={`course-content-list ${!props.isDemo && 'sticky-content'}`}>
      {videoSections.map((section, sectionIndex) => {
        const isSectionVisible = visibleSections.has(section);
        const sectionVideos = props.data.filter(
          (item) => item.videoSection === section
        );

        const sectionVideoCount = sectionVideos.length;
        const sectionStartIndex = totalCount;
        totalCount += sectionVideoCount;


        return (
          <div className={`section ${!props.isDemo && 'section-border'}`} key={section}>
            <div className="section-header">
              <div className="section-title">
                <h2>{section}</h2>
                <button
                  className="toggle-button"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="section-info">
              {sectionVideoCount} Lessons 
            </h5>
            <br />
            {isSectionVisible && (
              <div className="section-videos">
                {sectionVideos.map((item, index) => {
                  const videoIndex = sectionStartIndex + index;
                  return (
                    <div
                      className={`video-item ${
                        videoIndex === props.activeVideo ? "active-video" : ""
                      }`}
                      key={item._id}
                      onClick={() => props.isDemo ? null : props?.setActiveVideo(videoIndex)}
                    >
                      <div className="video-header">
                        <FaBook
                          size={25}
                          className="video-icon"
                          color="#1cdada"
                        />
                        <h1 className="video-title">{item.title}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
