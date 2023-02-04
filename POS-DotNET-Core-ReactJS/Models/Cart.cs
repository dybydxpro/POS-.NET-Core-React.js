using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models
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
