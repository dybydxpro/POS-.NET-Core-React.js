using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models.DTO
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
