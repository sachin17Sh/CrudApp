import 'bootstrap/dist/css/bootstrap.min.css';
import MUI_C from "../../lib/components/Components"
import { useEffect, useState } from "react";
import AddRecordForms from "./form/AddRecordForm";

export default function Home() {
  const [data, setData] = useState([]);
  const [currentRecord, setCurrentRecord] = useState({
    FirstName: '',
    LastName: '',
    EmployeeID: '',
    Age: '',
  });


  useEffect(() => {
    fetch("http://localhost:3000/userData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete the record?")) {
      fetch(`http://localhost:3000/userData/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setData(data.filter((item) => item.id !== id)); 
        })
        .catch((error) => console.error("Error deleting record:", error));
    }
  }


  function handleSubmit(values, isUpdate) {
    if (isUpdate) {

      fetch(`http://localhost:3000/userData/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(() => {
          setData((prevData) =>
            prevData.map((item) =>
              item.EmployeeID === values.EmployeeID ? { ...item, ...values } : item
            )
          );
        })
        .catch((error) => console.error("Error updating record:", error));
    } else {
 
      fetch("http://localhost:3000/userData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((newRecord) => {
          setData((prevData) => [...prevData, newRecord]);
        })
        .catch((error) => console.error("Error adding record:", error));
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
      <AddRecordForms initialValues={currentRecord} onSubmit={handleSubmit} />

      <MUI_C.Box>
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
            {data.map((item, index) => {
              return (
                <tr key={index}>
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
              );
            })}
          </tbody>
        </table>
      </MUI_C.Box>
    </>
  );
}
