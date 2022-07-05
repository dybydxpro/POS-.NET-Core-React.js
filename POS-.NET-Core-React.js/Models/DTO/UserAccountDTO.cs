using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models.DTO
{
    public class UserAccountDTO
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
