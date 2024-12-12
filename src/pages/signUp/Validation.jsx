
const useValidation = () => {
    const validate = values => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = 'First Name is mandatory';
      } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
      }
  
      if (!values.lastName) {
        errors.lastName = 'Last Name is mandatory';
      } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
      }
  
      if (!values.email) {
        errors.email = 'Email Address is mandatory';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!values.password) {
        errors.password = 'Please set a password';
      } else if (!passwordRegex.test(values.password)) {
        errors.password =
          'Password must have minimum eight characters, one letter and one number';
      }
    
      return errors;
    };
  
    return validate;
  };
  
  export default useValidation;
  