import './App.scss';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./views/Home/Home";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Profile from './views/Profile/Profile';
import Teacher from './views/Teacher/Teacher';
import CreateCourse from './views/Teacher/CreateCourse/CreateCourse';
import AllCourses from './views/Teacher/AllCourses';
import AllUsers from './views/Teacher/AllUsers';
import Courses from './views/Courses/Courses';
import CourseDetails from './views/CourseDetails/CourseDetails';
import CourseAccess from './views/CourseAccess/CourseAccess';
import EditCourse from './views/Teacher/CreateCourse/EditCourse';
import About from './views/About/About';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/teacher" element={<Teacher/>}/>
        <Route path="/teacher/create-course" element={<CreateCourse/>}/>
        <Route path="/teacher/edit-course/:id" element={<EditCourse />} />
        <Route path="/teacher/all-courses" element={<AllCourses/>}/>
        <Route path="/teacher/all-users" element={<AllUsers/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course-access/:id" element={<CourseAccess />} />
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
