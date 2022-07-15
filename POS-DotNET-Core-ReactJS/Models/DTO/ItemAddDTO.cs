using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class ItemAddDTO
    {
        [Required]
        public string ItemName { get; set; }
        [Required]
        public string Unit { get; set; }
    }
}
