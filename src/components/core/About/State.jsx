import React from "react";

const State = () => {
     const StatsData = [
          { count: "5K", label: "Active Students" },
          { count: "10+", label: "Mentors" },
          { count: "200+", label: "Courses" },
          { count: "50+", label: "Awards" },
     ];
     return (
          <div className="bg-richblack-700">
               <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                         {StatsData.map((value, index) => (
                              <div key={index} className="flex flex-col py-10">
                                   <h1 className="text-[30px] font-bold text-richblack-5">
                                        {value.count}
                                   </h1>
                                   <h2 className="font-semibold text-[16px] text-richblack-500">
                                        {value.label}
                                   </h2>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
};

export default State;
