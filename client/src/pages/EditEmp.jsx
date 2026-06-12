
import { useState } from "react";
import useApi from "../hooks/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


function EditEmp(){
    const {id}=useParams();
    const navigate=useNavigate();
    const [form,setForm]=useState({
    employeeId:"",
    fullName:"",
    emailAddress:"",
    department:'',
    designation:'', 
    salary:'',
    joiningDate:''
});
const axios = useApi();
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");

useEffect(()=>{
  const fetchemp=async()=>{
    try{
        const {data}= await axios.get(`/employees/${id}`);
        if(data.success){
            setForm({
                 employeeId:data.employee.employeeId,
    fullName:data.employee.fullName,
    emailAddress:data.employee.emailAddress,
    department:data.employee.department,
    designation:data.employee.designation, 
    salary:data.employee.salary,
    joiningDate:data.employee.joiningDate ? new Date(data.employee.joiningDate).toISOString().split('T')[0]  // ← "2024-06-15"
    : '',

         } );

        }
    }
    catch(error){
              setError(error.response?.data?.message || "Failed to load result.");
           }
           finally{
            setLoading(false);
           }
  }
fetchemp();

},[id]);


const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    try{
         e.preventDefault();
       setLoading(true);
       setError(null);
        const {data}=await axios.put(`/employees/${id}`,form);
        if(data.success)navigate('/emplist');

    }catch(err){
            setError(err.response?.data?.message || 'Something went wrong');
       }finally {
      setLoading(false);
    }
  }

return(
    <>
    

    <div className="at-section">
       <div className="container text-center">
<h4>Add Employee Details below</h4>
    <form onSubmit={handleSubmit} className="row justify-content-center mb-3">
     <div className="col-md-7 col-lg-6">
 {error && <div className="alert alert-danger text-start mb-3">{error}</div>}
 
     </div>
<div className="at-field mb-3">
                <label htmlFor="employeeId">EmployeeId</label>
                <input
                  id="employeeId"
                  type="text"
                  className="form-control"
                  
                  value={form.employeeId}
                  onChange={handleChange}
                />
              </div>
              {/* fullname */}
              <div className="at-field mb-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className="form-control"
                  
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
              {/* email */}
              <div className="at-field mb-3">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  type="email"
                  className="form-control"
                  
                  value={form.emailAddress}
                  onChange={handleChange}
                />
              </div>
              {/* department */}
              <div className="at-field mb-3">
                <label htmlFor="department">Department</label>
                <select 
                id="department"
                className="tl-select" 
                value={form.department} 
                onChange={handleChange}>
              <option value="">All</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="it">IT</option>

            </select>
            </div>
            {/* designation */}
             <div className="at-field mb-3">
                <label htmlFor="designation">Designation</label>
                <input
                  id="designation"
                  type="text"
                  className="form-control"
                  
                  value={form.designation}
                  onChange={handleChange}
                />
              </div>

              {/* salary */}
              <div className="at-field mb-3">
                <label htmlFor="salary">salary</label>
                <input
                  id="salary"
                  type="number"
                  className="form-control"
                  
                  value={form.salary}
                  onChange={handleChange}
                />
              </div>
              {/* joining date */}

               <div className="at-field mb-3">
                <label htmlFor="joiningDate">Joining date</label>
                <input
                  id="joiningDate"
                  type="date"
                  className="form-control"
                  
                  value={form.joiningDate}
                  onChange={handleChange}
                />
              </div>
              <button
              type="submit"
              className="btn btn-primary w-100 create-btn"
              disabled={loading}
              >{loading?'Updating':'Update Employee'}</button>
              


    </form>


       </div>

    </div>
    </>
);
}
export default EditEmp;