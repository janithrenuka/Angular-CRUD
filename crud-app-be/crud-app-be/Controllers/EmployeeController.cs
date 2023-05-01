using crud_app_be.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace crud_app_be.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _config;

        public EmployeeController(IConfiguration config)
        {
            _config = config;
        }


        //Get all employees
        [HttpGet(Name = "GetEmployeeListDetails")]
        //[Route("GetEmployeeListDetails")]
        public async Task<EmployeeListResponse> GetEmployeeListDetails()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            EmployeeListResponse employeeListResponse = new EmployeeListResponse();
            IEnumerable<Employee> employees = await SelectAllEmployees(connection);
            employeeListResponse.employees = employees;

            return employeeListResponse;
        }

        //Get one employee
        [HttpGet("{employeeId}", Name = "GetEmployeeDetails")]
        //[Route("GetEmployeeDetails")]
        public async Task<ActionResult<List<Employee>>> GetEmployeeDetails(int employeeId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var employee = await connection.QueryFirstAsync<Employee>("SELECT * FROM dbo.Employee WHERE Id = @Id",
                new { Id = employeeId });
            return Ok(employee);
        }

        //Add new employee
        //Use ExecuteAsynce when post or put data
        [HttpPost(Name = "AddNewEmployee")]
        //[Route("AddEmployee")]
        public async Task<ActionResult<List<Employee>>> AddNewEmployee(Employee employee)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            await connection.ExecuteAsync("INSERT INTO dbo.Employee (FirstName,LastName,Email,Company,Education,DateOfBirth,Gender,Experiance,Package)" +
                                            "VALUES (@FirstName,@LastName,@Email,@Company,@Education,@DateOfBirth,@Gender,@Experiance,@Package)", employee);
            return Ok(await SelectAllEmployees(connection));
        }

        //Update employee
        [HttpPut(Name = "UpdateEmployee")]
        //[Route("UpdateEmployee")]
        public async Task<ActionResult<List<Employee>>> UpdateEmployee(Employee employee)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("UPDATE dbo.Employee SET FirstName = @FirstName, LastName = @LastName,Email = @Email,Company = @Company,Education = @Education, DateOfBirth = @DateOfBirth,Gender = @Gender,Experiance = @Experiance,Package = @Package WHERE Id = @Id", employee);
            return Ok(await SelectAllEmployees(connection));
        }

        //Delete employee
        [HttpDelete("{employeeId}", Name = "DeleteEmployee")]
        //[Route("DeleteEmployee")]
        public async Task<ActionResult<List<Employee>>> DeleteEmployee(int employeeId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("DELETE FROM dbo.Employee WHERE Id = @Id", new { Id = employeeId });
            return Ok(await SelectAllEmployees(connection));
        }

        private static async Task<IEnumerable<Employee>> SelectAllEmployees(SqlConnection connection)
        {
            return await connection.QueryAsync<Employee>("SELECT * FROM dbo.Employee");
        }
    }
}
