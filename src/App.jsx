import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
// auth
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPass from "./pages/ForgotPass";
import ResetNewPassword from "./pages/ResetNewPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import { useSelector } from "react-redux";


function App() {
     const { user } = useSelector((state) => state.profile)
     return (
          <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
               {/* Navbar */}
               <Navbar />

               {/* Routes */}
               {/* Open routes */}
               <Routes>
                    <Route path="/" element={<Home />} />

                    {/* login */}
                    <Route
                         path="login"
                         element={
                              <OpenRoute>
                                   <Login />
                              </OpenRoute>
                         }
                    />

                    <Route
                         path="signup"
                         element={
                              <OpenRoute>
                                   <SignUp />
                              </OpenRoute>
                         }
                    />
                    <Route
                         path="verify-email"
                         element={
                              <OpenRoute>
                                   <VerifyEmail />
                              </OpenRoute>
                         }
                    />

                    <Route
                         path="forgot-password"
                         element={
                              <OpenRoute>
                                   <ForgotPass />
                              </OpenRoute>
                         }
                    />

                    <Route
                         path="update-password/:id"
                         element={
                              <OpenRoute>
                                   <ResetNewPassword />
                              </OpenRoute>
                         }
                    />

                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />

                    {/* Dashboard protected routes */}
                    <Route
                         // path="dashboard"
                         element={
                              <PrivateRoute>
                                   <Dashboard />
                              </PrivateRoute>
                         }
                    >
                         {/* child route */}
                         <Route path={"dashboard/my-profile"} element={<MyProfile />} />
                         <Route path={"dashboard/settings"} element={<Settings />} />

                    </Route>

                    {/* Erorr page */}
                    <Route path="*" element={<Error />}></Route>
               </Routes>
          </div>
     );
}

export default App;
