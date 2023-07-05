import React from 'react'

const IconBtn = ({
     onclick,
     text,
     children
}) => {
     return (
          <button className={`flex items-center gap-x-1 cursor-pointer rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold`} onClick={onclick}>
               {children ? (
                    <>
                         <span className=''>{text}</span>
                         {children}
                    </>
               ) : (<span>{text}</span>)}
          </button>
     )
}

export default IconBtn