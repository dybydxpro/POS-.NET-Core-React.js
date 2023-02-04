using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
