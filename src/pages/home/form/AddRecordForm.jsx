  import { useFormik } from 'formik';
  import { useState, useEffect } from 'react';
  import { Button } from 'react-bootstrap';

  export default function AddRecordForm({ initialValues, onSubmit }) {
    const [isUpdate, setIsUpdate] = useState(false);


  useEffect(()=>{
    if (initialValues && initialValues.EmployeeID) {
      setIsUpdate(true)
    }else{
      setIsUpdate(false)
    }
  },[initialValues])
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: initialValues || {
        FirstName: '',
        LastName: '',
        EmployeeID: '',
        Age: '',
      },
      onSubmit: (values) => {
        onSubmit(values, isUpdate);
      }
    });

    function handleClear() {
      formik.resetForm();
      setIsUpdate(false);
    }

    return (
      <form className="container mt-4" onSubmit={formik.handleSubmit}>
        <h3 className="text-center">{isUpdate ? 'Update Record' : 'New Record'}</h3>
        <div className="row">
          <div className="col-md-6 mb-3 p-3">
            <label htmlFor="FirstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Firstname"
              id="FirstName"
              name="FirstName"
              onChange={formik.handleChange}
              value={formik.values.FirstName}
            />
          </div>
          <div className="col-md-6 mb-3 p-3">
            <label htmlFor="LastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Lastname"
              id="LastName"
              name="LastName"
              onChange={formik.handleChange}
              value={formik.values.LastName}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 p-3">
            <label htmlFor="EmployeeID" className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your ID"
              id="EmployeeID"
              name="EmployeeID"
              onChange={formik.handleChange}
              value={formik.values.EmployeeID}
            />
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="Age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              id="Age"
              name="Age"
              onChange={formik.handleChange}
              value={formik.values.Age}
            />
          </div>
        </div>
        <div className="d-flex justify-content-start mt-3">
          {isUpdate ? (
            <span>
              <Button
                variant="info"
                className="w-100 m-2 p-2"
                type="submit"
              >
                Update
              </Button>
            </span>

          ) : (
            <span>
              <Button
                variant="info"
                className="w-100 m-2 p-2"
                type="submit"
              >
                Save
              </Button>
            </span>

          )}
          <span>
            <Button
              variant="dark"
              className="w-100 m-2 p-2"
              type="button"
              onClick={handleClear}
            >
              Clear
            </Button>

          </span>

        </div>
      </form>
    );
  }
