/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import "./Teacher.scss"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import api from "../../utils/axiosConfig";

const AllUsers = () => {
    const userFromState = useSelector(state => state.auth.user);
    const [user, setUser] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

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

    const columns = [
        {field: "id", headerName: "ID", flex: 0.5},
        {field: "name", headerName: "Name", flex: 0.5},
        {field: "email", headerName: "Email", flex: 0.5},
        {field: "role", headerName: "Role", flex: 0.5},
        {field: "courses", headerName: "Courses", flex: 0.5},
        {field: "createdAt", headerName: "Created at", flex: 0.5},
        {field: "  ", headerName: "Delete", flex: 0.2,
        renderCell: (params) => {
            return (
                <>
                    <Button>
                        <AiOutlineDelete className="text-black" size={20}/>
                    </Button>
                </>
            )
        }
    },
    ]

    const rows = [
    ]

    {
        courses && courses.forEach(item => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item?.courses?.length || 0,
                createdAt: item?.createdAt,

            });
        });
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const cachedUsers = sessionStorage.getItem("all-users");
            if (cachedUsers) {
                setCourses(JSON.parse(cachedUsers));
            } else {
                try {
                    const response = await api.get('/get-all-users');
                    setCourses(response.data.users);
                    sessionStorage.setItem("all-users", JSON.stringify(response.data.users));
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            }
        };

        fetchCourses();
    }, []);






    return (
        <div className="teacher">
            <Sidebar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible}/>
            <div className={`sidebar-menu ${isSidebarVisible ? 'hidden' : ''}`} onClick={()=>setIsSidebarVisible('true')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>

            <div className="mt-120px">
                <Box m="20px">
                <Box m="40px 0 0 0"
                height="80vh"
                    sx={{
                    "&.MuiDataGrid-root": {
                        border: "none",
                        outline: "none",
                    },
                    
                    "&.css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                        color: "#fff",
                    },
                    
                    "&.MuiDataGrid-sortIcon": {
                        color: "#fff",
                    },

                    "&.MuiDataGrid-row": {
                        color: "#fff",
                        borderBottom: "1px solid #ffffff30!important",
                    },

                    "&.MuiTablePagination-root": {
                        color: "#fff",
                    },

                    "&.MuiDataGrid-cell": {
                        borderBottom: "none",
                    },

                    "&.name-column--cell": {
                        color: "#fff",
                    },

                    "&.MuiDataGrid-column Headers": { 
                        backgroundColor: "#3e4396",
                        borderBottom: "none",
                    },

                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#b7ebde",
                        
                    },

                    "& .MuiDataGrid-footerContainer": {
                        color: "#fff",
                        borderTop: "none",
                        backgroundColor: "#3e4396" 
                    },

                    "&.MuiCheckbox-root": {
                        color: `#b7ebde !important`,

                    },

                    "&.MuiDataGrid-toolbarContainer .MuiButton-text": { 
                        color:`#fff !important`,
                    },

                    }}
                >
                <DataGrid checkboxSelection rows={rows} columns={columns}/>
                </Box>
                </Box>



            </div>

        </div>
    );
};

export default AllUsers;
