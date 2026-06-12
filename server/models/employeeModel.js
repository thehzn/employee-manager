const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true,
    trim: true,
    
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  emailAddress: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/, 'Please provide a valid email address']
  },
  department: {
    type: String,
    enum:["it","finance","marketing","sales","hr"],
    trim:true,
    required:[true,'Department is required'],
    
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  joiningDate: {
    type: Date,
    required: [true, 'Joining date is required']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
 
  timestamps: true 
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;