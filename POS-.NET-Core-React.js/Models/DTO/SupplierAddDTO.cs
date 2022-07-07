using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models.DTO
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
