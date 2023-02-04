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

    public class CartAddDTO
    {
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public double CartQty { get; set; }
        public double Price { get; set; }
        public int SellerID { get; set; }
    }

    public class CartGetDTO
    {
        public int CartID { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public string ItemName { get; set; }
        public string Unit { get; set; }
        public double Price { get; set; }
        public double CartQty { get; set; }
        public double NetPrice { get; set; }
        public int SellerID { get; set; }
    }
}
