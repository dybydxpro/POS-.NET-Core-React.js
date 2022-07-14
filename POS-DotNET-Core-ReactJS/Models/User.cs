using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models
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
}
