import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({ modalData }) => {
     return (
          <div className='fixed inset-0 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-5 backdrop-blur-sm z-[1000]'>
               <div className={`w-11/12  max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6`}>
                    <h2 className='text-2xl font-semibold text-richblack-5'>{modalData.title}</h2>
                    <p className='mt-3 mb-5 leading-6 text-richblack-200'>{modalData.subTitle}</p>

                    <div className='flex items-center gap-x-4'>
                         <IconBtn onclick={modalData.btnLogoutHandler} text={modalData.logoutBtnTxt} />
                         <button
                              className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                              onClick={modalData.btnCancelHandler}
                         >
                              {modalData.cancelBtnTxt}
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default ConfirmationModal