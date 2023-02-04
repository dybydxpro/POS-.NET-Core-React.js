using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class SupplierAddDTO
    {
        [Required]
        public string SupplierName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ContactNumber { get; set; }
    }
}
