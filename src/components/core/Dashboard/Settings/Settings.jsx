import React from 'react'
import UpdateProfilePic from './UpdateProfilePic'
import UpdateAdditionalDetails from './UpdateAdditionalDetails'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
     return (
          <>
               <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Profile</h1>
               {/* update profile picture */}
               <UpdateProfilePic />
               {/* update additional details */}
               <UpdateAdditionalDetails />
               {/* Deleting Account */}
               <DeleteAccount />
          </>
     )
}

export default Settings