import React from "react";
import { HighlightText } from "../../components/core/HomePage/HighlightText";
const ReviewAndRating = () => {
     return (
          <>
               <div className="my-10 w-11/12 max-w-maxContent flex flex-col gap-2 m-auto items-center justify-between">
                    <h1 className="text-4xl text-richblack-5 font-semibold">
                         Review <HighlightText text={" from other learners"} />{" "}
                    </h1>
                    
               </div>
          </>
     );
};

export default ReviewAndRating;
