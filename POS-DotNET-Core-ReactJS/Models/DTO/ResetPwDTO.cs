using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class ResetPwDTO
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
