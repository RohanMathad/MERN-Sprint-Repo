const employeeData = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    salary: 60000,
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager",
    salary: 75000,
  },
  {
    id: 3,  
    name: "Mike Johnson",
    position: "UX Designer",
    salary: 55000,
  }
];

// Js utility functions...

function findEmployeeById(id) {
    return employeeData.find(employee => employee.id === id);
}


function calculateAverageSalary(){
    const totalSalary = employeeData.reduce((acc, employee) => acc + employee.salary, 0);
    return totalSalary / employeeData.length;
}