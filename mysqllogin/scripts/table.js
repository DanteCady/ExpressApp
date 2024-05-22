document.addEventListener('DOMContentLoaded', function() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:3000/employees", requestOptions)
        .then(response => response.json())
        .then(employees => {
            const table = document.querySelector('table');
            employees.forEach(employee => {
                const row = table.insertRow(-1);  // Insert a new row at the end of the table
                const firstNameCell = row.insertCell(0);
                const lastNameCell = row.insertCell(1);
                const departmentCell = row.insertCell(2);
                const startDateCell = row.insertCell(3);
                const salaryCell = row.insertCell(4);

                firstNameCell.textContent = employee.firstName;
                lastNameCell.textContent = employee.lastName;
                departmentCell.textContent = employee.department;
                startDateCell.textContent = new Date(employee.hireDate).toLocaleDateString(); // Formats date
                salaryCell.textContent = employee.salary // Formats salary as currency
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
});
