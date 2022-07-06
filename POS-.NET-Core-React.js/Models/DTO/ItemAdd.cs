using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models.DTO
{
    public class ItemAdd
    {
        [Required]
        public string ItemName { get; set; }
        [Required]
        public string Unit { get; set; }
    }
}
