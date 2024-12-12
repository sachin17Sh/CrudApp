import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import MUI_I from "../../lib/icons/Icons";
import { useState } from "react";

export default function SignIn() {
  const[showpassword, setshowpassword] = useState(false)
  const navigation = useNavigate()
  function handlepassword(){
    setshowpassword(prevState => !prevState)
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
  
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8083/login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const result = await response.json();
          if (result.status === true) {
            // alert('Sign In successful!' ); 
            navigation('/home')
          }else{
            alert('Invaid Email or Password')
          }
        } else if (response.status === 401) {
          alert('Unauthorized: Invalid credentials');
        } else {
          alert('An error occurred. Please try again.');
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="FormSection">
     <h2>Login</h2>
     <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
     <label htmlFor="password">Password</label>
      <div className="password-wrapper">
        <input
          id="password"
          name="password"
          type= {showpassword?'text':"password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <MUI_I.VisibilityIcon 
          className="visibility-icon" 
          onClick= {handlepassword}
        />
      </div>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      <button type="submit" disabled={formik.isSubmitting}>Login</button>
    </form>
  )
}
