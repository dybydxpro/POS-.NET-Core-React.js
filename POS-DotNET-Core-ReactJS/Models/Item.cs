using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models
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

    public class ItemAddDTO
    {
        [Required]
        public string ItemName { get; set; }
        [Required]
        public string Unit { get; set; }
    }
}
