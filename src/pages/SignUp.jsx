import React from 'react'
import signupImage from '../assets/Images/signup.webp'
import Template from '../components/core/Auth/Template'

const SignUp = () => {
  return (
    <div>
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signupImage}
        formType="signup"
      />
    </div>
  )
}

export default SignUp