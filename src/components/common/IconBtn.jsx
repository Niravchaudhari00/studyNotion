import React from 'react'

const IconBtn = ({
     onclick,
     type,
     text,
     children
}) => {
     return (
          <button className={`flex items-center gap-x-1 cursor-pointer rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold`} type={type} onClick={onclick}>
               {children ? (
                    <>
                         <span className='text-richblack-900'>{text}</span>
                         {children}
                    </>
               ) : (<span>{text}</span>)}
          </button>
     )
}

export default IconBtn