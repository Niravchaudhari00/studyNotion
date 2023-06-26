import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
     return (
          <Link to={linkto}>
               <div
                    className={`text-center text-sm max-md:text-xs py-3 px-6 font-semibold rounded-md hover:scale-95 transition-all duration-200 ${active ? 'bg-yellow-50 text-richblack-800 shadow-lg shadow-yellow-50/40' : 'bg-richblack-800 shadow-lg shadow-richblack-700/40'}`}
               >
                    {children}
               </div>
          </Link>
     )
}

export default Button