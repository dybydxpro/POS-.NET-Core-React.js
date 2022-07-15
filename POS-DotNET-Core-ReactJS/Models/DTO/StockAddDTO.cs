using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class StockAddDTO
    {
        [Required]
        public int ItemID { get; set; }
        [Required]
        public decimal Qty { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
