import React, { useEffect, useState } from "react";
import "./Sidebar.scss"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authActions";

const Sidebar = (props) => {
    const userFromState = useSelector(state => state.auth.user);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userFromState) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user')));

        }
    }, [userFromState, navigate]);

    const imageUser = user?.avatar || '/user.png';

    const logoutButton = async(event) => {
        event.preventDefault();
        
        try {
            dispatch(logout());
            console.log("User logged out successfully");
  
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={`sidebar ${props.isSidebarVisible ? '' : 'hidden'}`}>
            <div className="close" onClick={() => props.setIsSidebarVisible(false)} >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
            </div>
            <div className="teacher-image">
                <img src={imageUser} alt="Profile" />
            </div>
            <div className="profile-details">
                <p className="name">{user?.name}</p>
                <p className="role">- Teacher</p>
            </div>

            <div className="options">
                <div onClick={() => navigate('/teacher')}>
                    <img 
                        src="/home.png"
                        loading="lazy" 
                        alt={'User'} 
                    /> 
                    <p>Dashboard</p>
                </div>
                <h3>Data</h3>
                <div onClick={() => navigate('/teacher/all-courses')}>
                    <img 
                        src="/classes.png"
                        loading="lazy" 
                        alt={'User'} 
                    /> 
                    <p>Courses</p>
                </div>
                <div onClick={() => navigate('/teacher/all-users')}>
                    <img 
                        src="/students.png"
                        loading="lazy" 
                        alt={'User'} 
                    /> 
                    <p>Users</p>
                </div>
                <h3>Content</h3>
                <div onClick={() => navigate('/teacher/create-course')}>
                    <img 
                        src="/newcourse.png"
                        loading="lazy" 
                        alt={'User'} 
                    /> 
                    <p>Create course</p>
                </div>
                <div>
                    <img 
                        src="/live.png"
                        loading="lazy" 
                        alt={'User'} 
                    /> 
                    <p>Go Live</p>
                </div>
                <h3>Extras</h3>
                <div onClick={logoutButton}>
                    <img 
                        src="/exit.png"
                        loading="lazy" 
                        alt={'User'} 
                    /> 
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
