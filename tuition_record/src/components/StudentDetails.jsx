import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import './Home.css'
export const StudentDetails=()=>{
    const {studentId}=useParams()
        // console.log(studentId);
    const [data, setData] = useState({});
let count=1
 useEffect(()=>{
    fetch(`http://localhost:5000/student/${studentId}`).then((res)=>res.json()).then((d)=>setData(d.student))
 },[])


switch(data.name){
case undefined:return <div>Student does not exist</div>

default:return <div className="return">

<h3>{data.name} Details</h3>
<Table style={{width:"70%", margin:"2rem auto"}} striped bordered hover size="sm">
<thead>
    <tr>
         <th>#</th>
      <th>Name</th>
      <th>Age</th>
       <th>Gender</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
 <tr>
     <td>1</td>
     <td>{data.name}</td>
     <td>{data.age}</td>
     <td>{data.gender}</td>
     <td>{data.grade}</td>
 </tr>
  </tbody>
    </Table>

<h4>{data.name} Test Score</h4>
<Table style={{width:"70%", margin:"2rem auto"}} striped bordered hover size="sm">
<thead>
    <tr>
         <th>#</th>
      <th>Test Name</th>
      <th>Marks</th>
      <th>Subject</th>
      <th>Test Date</th>
    </tr>
  </thead>
  <tbody>
  {data.test_id.map((el) => (
        <tr key={el._id}>
            <td>{count++}</td>
            <td>{el.name}</td>
            <td>{el.marks}</td>
            <td>{el.subject}</td>
            <td>{el.date}</td>
        </tr>
      ))}
  </tbody>
    </Table>

   
      </div>                

}
    
}