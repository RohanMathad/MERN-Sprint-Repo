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

const findEmployeeById = (id) => {
    return employeeData.find(employee => employee.id === id);
}


const calculateAverageSalary = () => {
    const totalSalary = employeeData.reduce((acc, employee) => acc + employee.salary, 0);
    return totalSalary / employeeData.length;
}

const getEmployeeNames = () => {
    return employeeData.map(employee => employee.name);
}

const getEmployeeByDesignation = (designation) => {
    return employeeData.filter(employee => employee.position === designation);
}


// Example usage s
console.log(findEmployeeById(2)); // { id: 2, name: 'Jane Smith', position: 'Project Manager', salary: 75000 }
console.log(calculateAverageSalary()); // 63333.333333333336
console.log(getEmployeeNames()); // [ 'John Doe', 'Jane Smith', 'Mike Johnson' ]
console.log(getEmployeeByDesignation("Software Engineer")); // [ { id: 1, name: 'John Doe', position: 'Software Engineer', salary: 60000 } ]

