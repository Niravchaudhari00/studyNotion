import React from "react";
import ContactForm from "../components/common/ContactForm";
import Footer from "../components/common/Footer";
import ReviewAndRating from "../components/common/ReviewAndRating";
import ContactDetails from "../components/core/Contact/ContactDetails";

const Contact = () => {
     return (
          <>
               <div className="w-11/12 max-w-maxContent m-auto px-5 flex lg:flex-row flex-col lg:justify-between mx-auto my-16">
                    <div className="lg:w-[40%] h-fit my-10 drop-shadow-xl">
                         <ContactDetails />
                    </div>

                    <div className="w-full lg:w-[45%] my-10 p-5 flex justify-center border-[0.5px] border-richblack-5 rounded-md ">
                         <ContactForm
                              heading={
                                   "Got a Idea? We’ve got the skills. Let’s team up"
                              }
                              para={
                                   "Tall us more about yourself and what you’re got in mind."
                              }
                         />
                    </div>
               </div>
               <div>
                    <ReviewAndRating />
               </div>
               {/* footer */}
               <div>
                    <Footer />
               </div>
          </>
     );
};

export default Contact;
