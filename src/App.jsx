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
function App() {
     return (
          <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
               {/* Navbar */}
               <Navbar />

               {/* Routes */}
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
               </Routes>
          </div>
     );
}

export default App;
