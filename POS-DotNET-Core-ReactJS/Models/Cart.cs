using System.ComponentModel.DataAnnotations;

namespace POS_.NET_Core_React.js.Models
{
    public class Cart
    {
        [Key]
        public int CartID { get; set; }
        [Required]
        public int ItemID { get; set; }
        [Required]
        public int StockID { get; set; }
        [Required]
        public double CartQty { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int SellerID { get; set; }
    }
}
