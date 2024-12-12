import 'bootstrap/dist/css/bootstrap.min.css';
import MUI_C from "../../lib/components/Components"
import { EmployeeData } from "../../data/EmployeeData"
import { useEffect, useState } from "react";
import AddRecordForms from "./form/AddRecordForm";



export default function Home() {
 const [data,setdata] = useState([])
 const [currentRecord, setCurrentRecord] = useState({
  FirstName: '',
  LastName: '',
  EmployeeID: '',
  Age: '',
});
  
 useEffect(()=>{
  setdata(EmployeeData)
 },[])

function handleEdit(id) {
  const record = data.find((item) => item.id === id);
  if (record) {
    setCurrentRecord({
      FirstName: record.FirstName,
      LastName: record.LastName,
      EmployeeID: record.EmployeeID,
      Age: record.Age,
    });
  }
}
 
 function handleDelete(id){
  if (id>0) {
    if (window.confirm("Are you sure you want to delete the record")) {
      const record = data.filter((item)=> item.id != id)
      setdata(record)
    }
  }
 }

 function handleSubmit(values, isUpdate) {
  if (isUpdate) {
    setdata((prevData) =>
      prevData.map((item) =>
        item.EmployeeID === values.EmployeeID ? { ...item, ...values } : item
      )
    );
  } else {
    setdata((prevData) => [
      ...prevData,
      { id: prevData.length + 1, ...values },
    ]);
  }

  setCurrentRecord({
    FirstName: '',
    LastName: '',
    EmployeeID: '',
    Age: '',
  });
}

  return (
    <>
      <h2 className="mt-5 text-center text-danger">Employee Records</h2>
      <AddRecordForms initialValues={currentRecord}   onSubmit={handleSubmit}  /> 
     
      <MUI_C.Box >
        <table className="table table-hover m-5 text-center">
          <thead>
            <tr>
              <td>S.No</td>
              <td>ID</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>EmployeeID</td>
              <td>Age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.EmployeeID}</td>
                  <td>{item.Age}</td>
                  <td>
                    <MUI_C.Button
                      className="btn btn-primary w-25"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </MUI_C.Button>
                    <MUI_C.Button
                      className="btn btn-danger w-25"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </MUI_C.Button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </MUI_C.Box>
    </>
  )
}