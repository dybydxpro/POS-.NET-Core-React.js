using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models.DTO
{
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
}
