using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models
{
    public class Item
    {
        [Key]
        public int ItemID { get; set; }
        [Required]
        public string ItemName { get; set; }
        [Required]
        public string Unit { get; set; }
    }
}
