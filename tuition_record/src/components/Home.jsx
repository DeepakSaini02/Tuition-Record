import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import './Home.css'



export const Home = () => {
  const { isAuth, toggleAuth } = useContext(AuthContext);
 
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(1);


  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

    const age = searchParams.get("sort") || 0;
    const grade=searchParams.get("grade") || "";
    const gender=searchParams.get("gender") || "";
    const search=searchParams.get('search') || "";

  let arr = [];
  for (let i = 1; i <= total; i++) {
    arr[i] = i;
  }

  useEffect(() => {
    getData();
  }, [page, age,grade,gender,search]);

  const getData = () => {
    // console.log(page, age,grade,gender,search);
    fetch(`http://localhost:5000/student/?page=${page}&sort=${age}&grade=${grade}&gender=${gender}&search=${search}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d.student);
        setTotal(d.totalPages);
      });
  };
//   console.log(data);

  const handlePagination = (p) => {
    if (age != 0) navigate(`/home/?page=${p}&sort=${-1}`);
    else if(grade) navigate(`/home/?page=${p}&grade=${grade}`)
    else if(gender) navigate(`/home/?page=${p}&gender=${gender}`)
    else navigate(`/home/?page=${p}`);
    
  };

  const handleSort = () => {
    navigate(`/home/?page=${page}&sort=${-1}`);
  };

  const handleGrade=(val)=>{
      navigate(`/home/?grade=${val}`);
  }
   const handleGender=(val)=>{
      navigate(`/home/?gender=${val}`);
  }

   const handleSearch=(val)=>{
       console.log(val);
      navigate(`/home/?search=${val}`);
  }
  let count=1
  return (
    <div>
        <div className="main">
 filter by grade
      <select onChange={(e)=>handleGrade(e.target.value)} name="grade" id="">
        <option value=""></option>
        <option value="1to5">1-5</option>
        <option value="6to8">6-8</option>
        <option value="9to10">9-10</option>
        <option value="11to12">11-12</option>
      </select>

filter by gender
      <select onChange={(e)=>handleGender(e.target.value)} name="grade" id="">
        <option value=""></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button className="btn1" onClick={handleSort}>sort by age</button>

    <input className="input" type="text" onChange={(e)=>handleSearch(e.target.value)} />
        </div>
       
{/* <Link to={`/users/${el.id}`}>More Details</Link> */}
<div className="return">
<Table style={{width:"70%", margin:"2rem auto"}} striped bordered hover size="sm">
<thead>
    <tr>
         <th>#</th>
      <th>Name</th>
      <th>Total Test</th>
    </tr>
  </thead>
  <tbody>
  {data.map((el) => (
        <tr key={el._id} onClick={()=>navigate(`/home/${el._id}`)}>
            <td>{((page-1)*3)+count++}</td>
            <td>{el.name}</td>
            <td>{el.test_id.length}</td>
        </tr>
      ))}
  </tbody>
    </Table>

    </div>

      {arr.map((el) => (
        <button key={el} onClick={() => handlePagination(el)}>{el}</button>
      ))}
    </div>
  );
};
