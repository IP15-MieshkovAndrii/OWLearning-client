import React, { useEffect, useState } from "react";
import "./Teacher.scss"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Teacher = () => {
    const userFromState = useSelector(state => state.auth.user);
    const [user, setUser] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const navigate = useNavigate();

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




    return (
        <div className="teacher">
            <Sidebar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible}/>
            <div className={`sidebar-menu `} onClick={()=>setIsSidebarVisible('true')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>

        </div>
    );
};

export default Teacher;
