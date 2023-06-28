import React, { useState } from 'react'
import Tab from '../../common/Tab';
import { ACCOUNT_TYPE } from '../../../utils/constans';




const SignUpForm = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const tabData = [
    {
      id: 1,
      tabName: "student",
      type: ACCOUNT_TYPE.STUDENT
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR
    },
  ]
  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form action="" className='flex flex-col w-full  gap-y-4 mt-7'>
        <div className='flex gap-x-2'>
          <label htmlFor='firstName'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              First Name <sup className='text-pink-200'>*</sup>
            </p>
            <input
              id='firstName'
              type="text"
              placeholder='Enter first name'
              style={{ boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)` }}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
          </label>
          <label htmlFor='lasttName'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Last Name <sup className='text-pink-200'>*</sup>
            </p>
            <input
              id='lastName'
              type="text"
              placeholder='Enter last name'
              style={{ boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)` }}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
          </label>
        </div>
        <div className=''>
          <label htmlFor='email'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Email Address <sup className='text-pink-200'>*</sup>
            </p>
            <input
              id='email'
              type="text"
              placeholder='Enter email address'
              style={{ boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)` }}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
          </label>
        </div>
        <div className='flex gap-x-2'>
          <label htmlFor='password'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Password <sup className='text-pink-200'>*</sup>
            </p>
            <input
              id='password'
              type="text"
              placeholder='Enter password'
              style={{ boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)` }}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
          </label>
          <label htmlFor='confirmPassword'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Confirm password <sup className='text-pink-200'>*</sup>
            </p>
            <input
              id='confirmPassword'
              type="text"
              placeholder='Enter confirm password'
              style={{ boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)` }}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignUpForm