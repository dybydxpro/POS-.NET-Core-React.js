using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models.DTO
{
    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
