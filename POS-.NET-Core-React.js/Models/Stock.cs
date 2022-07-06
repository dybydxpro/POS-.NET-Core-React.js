using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models
{
    public class Stock
    {
        [Key]
        public int StockID { get; set; }
        [Required]
        public int ItemID { get; set; }
        [Required]
        public double Qty { get; set; }
        [Required]
        public double Price { get; set; }
    }
}
