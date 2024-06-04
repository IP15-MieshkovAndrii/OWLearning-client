import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo, updateProfilePicture, updatePassword, logout } from "../../features/auth/authActions";

const Profile = () => {
    const userFromState = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [oldPas, setOldPas] = useState("");
    const [newPas, setNewPas] = useState("");
    const [confirmPas, setConfirmPas] = useState("");
    const [email, setEmail] = useState("");
    const [active, setActive] = useState(1);

    useEffect(() => {
        if (!userFromState) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user')));
        }
    }, [userFromState, navigate]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email)
        }
    }, [user]);

    const isTeacher = user?.role || 'student';

    const handleUpdateUserInfo = async () => {
        try {
            const userInfo = {
                name: (name !== user.name) ? name : "",
                email: (email !== user.email) ? email : "",
                user
            }
            await dispatch(updateUserInfo(userInfo)).unwrap();
            alert("User information updated successfully!");
        } catch (error) {
            console.error("Error updating user information:", error);
        }
    };

    const handleUpdateProfilePicture = async (e) => {
        const file = e.target.files[0];
    
        const reader = new FileReader();
    
        reader.onload = async (event) => {
            const base64String = event.target.result;
            const json = JSON.stringify(user);
    
            const userData = {
                user: json,
                avatarUrl: base64String,
            };
    
            try {
                await dispatch(updateProfilePicture(userData));
                alert("Profile picture updated successfully!");
            } catch (error) {
                console.error("Error updating profile picture:", error);
            }
        };
    
        reader.readAsDataURL(file);
    };

    const handleUpdatePassword = async () => {
        if (!newPas || !confirmPas || !oldPas) {
            alert('Enter all fields!');
            return;
        }

        if (newPas !== confirmPas) {
          alert('New password and confirm password do not match.');
          return;
        }
    
        try {
          await dispatch(updatePassword({ oldPassword: oldPas, newPassword: newPas, id: userFromState })).unwrap();
          alert('Password updated successfully.');
        } catch (error) {
          alert('Failed to update password: ' + error.message);
        }
    };

    const logoutButton = async(event) => {
        event.preventDefault();
        
        try {
            dispatch(logout());
            console.log("User logged out successfully");
  
        } catch (error) {
            console.log(error)
        }
    }
    
    const imageUser = user?.avatar || '/user.png';

    return (
        <div className="profile-container">
            <div className="nav-box">
                <div className={`box-element ${active === 1 ? 'active' : ''}`} onClick={() => setActive(1)}>
                    <div className="box-image">
                        <img src={imageUser} alt="Profile" />
                    </div>
                    My account
                </div>
                <div className={`box-element ${active === 2 ? 'active' : ''}`} onClick={() => setActive(2)}>
                    <div className="box-image">
                        <svg className="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                            <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z"></path>
                        </svg>
                    </div>
                    Change password
                </div>
                <div className={`box-element ${active === 3 ? 'active' : ''}`} onClick={() => setActive(3)}>
                    <div className="box-image">
                        <svg className="transparent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                    Enrolled courses
                </div>
                {isTeacher === 'teacher' && (
                    <div className={`box-element`}  onClick={() => navigate('/teacher')}>
                    <div className="box-image">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21.4 15V9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                    Teacher dashboard
                </div>
                )}

                <div className={`box-element`} onClick={logoutButton}>
                    <div className="box-image">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                    Log out
                </div>

            </div>

            {active === 1 && (
                <div className="update-box">
                    <div className="profile-image">
                        <label htmlFor="profile-picture">
                            <img src={imageUser} alt="Profile" />
                            <input type="file" id="profile-picture" accept="image/*" onChange={handleUpdateProfilePicture} />
                        </label>
                    </div>
                    <div className="profile-details">
                        <p>Full name</p>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <p>Email</p>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button  className="updateButton" onClick={handleUpdateUserInfo}><span>Update</span></button>
                    </div>
                </div>

            )}
            {active === 2 && (
                <div className="update-box">
                    <h1>Change password</h1>
                    <div className="password">
                        <p>Old password</p>
                        <input type="password" value={oldPas} onChange={(e) => setOldPas(e.target.value)} />
                        <p>New password</p>
                        <input type="password" value={newPas} onChange={(e) => setNewPas(e.target.value)} />
                        <p>Confirm password</p>
                        <input type="password" value={confirmPas} onChange={(e) => setConfirmPas(e.target.value)} />
                        <button  className="updateButton" onClick={handleUpdatePassword}><span>Update</span></button>
                    </div>

                </div>
            )}
            {active === 3 && (
                <div className="update-box">
                    
                </div>
            )}
        </div>
    );
};

export default Profile;
