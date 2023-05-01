namespace crud_app_be.Models
{
    public class Employee
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Company { get; set; }
        public string? Email { get; set; }
        public string? Education { get; set; }
        public DateTime?  DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public int? Experiance { get; set; }
        public int? Package { get; set; }
        public bool? IsActive { get; set; }
    }
}
