const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");
const User = require("../models/userModel"); 
const Employee=require("../models/employeeModel");
exports.userRegister = async(req,res)=>{

    try{

const {name,email,password}=req.body;


if(!name || !email || !password ){
    return res.status(400).json({
        message:"enter full details" ,
        success:false 
    });
}
const existinguser = await User.findOne({email});
if(existinguser){
     return res.status(400).json({ message: "Email already registered", 
        success: false });
}


  const user=await User.create({ name, email, password }); 
    
  const token =await generateToken(user._id); 
 
         res.status(201).cookie("token", token).json({
        message:"user registered succussfully" ,
        success:true,
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        
      },
    });
    }
    catch(error){
         return res.status(500).json({
            message: error.message,
            success:false,
        });
    }
}



exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Enter full details",
        success: false,
      });
    }
     console.log("Body received:", req.body);
    console.log("Email:", email, "| Type:", typeof email);

    // Check ALL users in DB
    const allUsers = await User.find({});
    console.log("All users in DB:", allUsers);

   
   

  
    const user = await User.findOne({ email }).select("+password");
 console.log("Found user:", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    
     const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = await generateToken(user._id);

    
    user.password = undefined;

 
    return res.status(200)
      .cookie('token', token)
      .json({
        message: "User logged in successfully",
        success: true,
        user,
      });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
exports.addEmp=async(req,res)=>{
  try{
    const {employeeId,fullName,emailAddress,department,designation,salary,joiningDate,status}=req.body;
    console.log(req.body);
    const employee=await Employee.create({
      employeeId,
      fullName,
      emailAddress,
      department,
      designation,
      salary,
      joiningDate,
      status
    });
    res.status(200).json({
      success:true,
      data:employee,
      message:"employee added successfully",
    });

  }
  catch(error){
    console.log(error);
     res.status(500).json({ success: false, message: error.message });
  }
}

exports.getAll=async(req,res)=>{
    try{
       const {search,department,status, page = 1, limit = 10}=req.query;
       const query={};
       if(search){
        query.$or=[
            {fullName:{$regex:search,$options:"i"}},
            {emailAddress:{$regex:search,$options:"i"}},
        ]
       }
       if(department&& department !== 'all')query.department=department;
       if(status&& status !=="all")query.status=status;
        const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [employees,total]=await Promise.all([
      Employee.find(query).sort({createdAt:-1}).skip(skip).limit(limitNum),
      Employee.countDocuments(query),
    ]);
    console.log("Total found:", total);
console.log("First employee:", employees[0]);

      


       res.status(200).json({
        success:true,
        employees,
        pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },

        

       })
        
       
    }
    catch(error){
  res.status(500).json({ success: false, message: error.message });
    }
}

exports.updateEmp=async(req,res)=>{
  try{
    const {id}=req.params;
    const emp= await Employee.findById(id);
    if(!emp){
      return res.status(404).json({
        success:false,
        message:"not found"
      });
    }

    const { employeeId,
      fullName,
      emailAddress,
      department,
      designation,
      salary,
      joiningDate}=req.body;
      const updates={};
      if(employeeId)updates.employeeId=employeeId;
      if(fullName)updates.fullName=fullName;
      if(emailAddress)updates.emailAddress=emailAddress;
      if(department)updates.department=department;
      if(designation)updates.designation=designation;
      if(salary)updates.salary=salary;
      if(joiningDate)updates.joiningDate=joiningDate;
      
      const updatedEmp=await Employee.findByIdAndUpdate(
        id,
        {$set:updates},
        {new:true,runValidators:true}
      );
      return res.status(200).json({
        success:true,
      message: "employee updated successfully",
      data:updatedEmp,
    });  

     


  }
  catch(error){
return res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.deleteEmp=async(req,res)=>{
  try{
    const {id}=req.params;
    const emp= await Employee.findById(id);
    if(!emp){
      return res.status(404).json({
        success:false,
        message:"not found"
      });
    }
    await emp.deleteOne();
    res.status(200).json({
      success: true,
      message: "employee deleted successfully",
    });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}

exports.getEmp=async(req,res)=>{
  try{
    const {id} = req.params;
    const employee=await Employee.findById(id);
    if(!employee){
        return res.status(404).json({
        success:false,
        message:"not found"
      });
    }
    res.status(200).json({
      success:true,
      employee,
      message:"employee details fetched successfully"
    });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}