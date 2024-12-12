
import { useFormik } from 'formik';
import "../../assets/CSS/signUp/Signup.css"
import MUI_I from "../../lib/icons/Icons.jsx";
import useValidation from './Validation';
import { Link } from "react-router-dom";
import { useState } from 'react';
const SignupForm = () => {
  const validate = useValidation()
  const [showpassword, setshowpassword] = useState(false)
  function handlepassword(){
    setshowpassword(prevState => !prevState);
  }
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values,{resetForm}) => {
      try {
        const res = await fetch('http://localhost:8083/api/signUp', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          const result = await res.json();
          alert(`Sign Up successfull. Welcome: ${values.firstName}  ${values.lastName}` + JSON.stringify(result) );
          resetForm()
        } else {
          alert('Failed to sign up. Please try again.');
        }

      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit} className='FormSection'>
      <h2>Sign Up </h2>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className='errors'>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className='errors'>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='errors'>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="password">Password</label>
      <div className="password-wrapper">
        <input
          id="password"
          name="password"
          type= {showpassword?'text':'password'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <MUI_I.VisibilityIcon 
          className="visibility-icon" 
          onClick= {handlepassword}
        />
      </div>
      {formik.touched.password && formik.errors.password ? (
        <div className='errors'>{formik.errors.password}</div>
      ) : null}
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>

      <button type="submit" disabled={formik.isSubmitting}>Sign Up</button>
    </form>
  );
};

export default SignupForm