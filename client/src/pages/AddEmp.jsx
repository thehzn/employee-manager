
import { useState } from "react";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";


function AddEmp(){
const navigate =useNavigate();
    const [form,setForm]=useState({
    employeeId:"",
    fullName:"",
    emailAddress:"",
    department:'',
    designation:'', 
    salary:'',
    joiningDate:''
});
const {api,loading,error}= useApi();


const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    
         e.preventDefault();
      
        const {data}=await api.post('/employees',form);
        if(data.success)navigate('/emplist');

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
     <div className="row g-3">
<div className="col-12 col-md-6">
                <label htmlFor="employeeId"className="form-label">EmployeeId</label>
                <input
                  id="employeeId"
                  type="text"
                  className="form-control"
                  
                  value={form.employeeId}
                  onChange={handleChange}
                />
              </div>
              {/* fullname */}
              <div className="col-12 col-md-6">
                <label htmlFor="fullName"className="form-label">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className="form-control"
                  
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
              {/* email */}
              <div className="col-12 col-md-6">
                <label htmlFor="email"className="form-label">Email Address</label>
                <input
                  id="emailAddress"
                  type="email"
                  className="form-control"
                  
                  value={form.emailAddress}
                  onChange={handleChange}
                />
              </div>
              {/* department */}
              <div className="col-12 col-md-6">
                <label htmlFor="department"className="form-label">Department</label>
                <select 
                id="department"
                className="tl-select" 
                value={form.department} 
                onChange={handleChange}>
             <option value="">--Select--</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="it">IT</option>

            </select>
            </div>
            {/* designation */}
             <div className="col-12 col-md-6">
                <label htmlFor="designation"className="form-label">Designation</label>
                <input
                  id="designation"
                  type="text"
                  className="form-control"
                  
                  value={form.designation}
                  onChange={handleChange}
                />
              </div>

              {/* salary */}
              <div className="col-12 col-md-6">
                <label htmlFor="salary"className="form-label">salary</label>
                <input
                  id="salary"
                  type="number"
                  className="form-control"
                  
                  value={form.salary}
                  onChange={handleChange}
                />
              </div>
              {/* joining date */}

               <div className="col-12 col-md-6">
                <label htmlFor="joiningDate"className="form-label">Joining date</label>
                <input
                  id="joiningDate"
                  type="date"
                  className="form-control"
                  
                  value={form.joiningDate}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="col-12">
  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
    {loading ? 'Adding...' : 'Add Employee'}
  </button>
</div>
              


    </form>


       </div>

    </div>
    </>
);
}
export default AddEmp;

