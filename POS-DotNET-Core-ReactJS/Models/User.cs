using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string NIC { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string UserName { get; set; }
        public string Password { get; set; }
        [Required]
        public string Type { get; set; }
        public bool Status { get; set; }
    }

    public class UserAccountDTO
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Token { get; set; }
    }

    public class UserAccountHashDTO
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class UserActiveDTO
    {
        public int ChangerUserID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class UserCountDTO
    {
        public string Type { get; set; }
        public int NoOfUsers { get; set; }
    }

    public class UserAdd
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string NIC { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Type { get; set; }
    }

    public class UserEdit
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string NIC { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Type { get; set; }
    }

    public class ResetPwDTO
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
