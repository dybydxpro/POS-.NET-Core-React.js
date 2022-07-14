using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models.DTO
{
    public class ResetPwDTO
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
