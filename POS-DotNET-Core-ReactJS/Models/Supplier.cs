using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierID { get; set; }
        [Required]
        public string SupplierName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ContactNumber { get; set; }
    }
}