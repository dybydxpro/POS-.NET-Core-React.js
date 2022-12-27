using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models
{
    public class Sale
    {
        [Key]
        public int CartID { get; set; }
        [Required]
        public int BillNo { get; set; }
        [Required]
        public int ItemID { get; set; }
        [Required]
        public int StockID { get; set; }
        [Required]
        public double SoldQty { get; set; }
        [Required]
        public double SoldPrice { get; set; }
        [Required]
        public int SellerID { get; set; }
        [Required]
        public DateTime Timescape { get; set; }
    }

    public class SaleAddDTO
    {
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public double SoldQty { get; set; }
        public double SoldPrice { get; set; }
        public int SellerID { get; set; }
    }

    public class SaleAddInDTO
    {
        public int BillNo { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public double SoldQty { get; set; }
        public double SoldPrice { get; set; }
        public int SellerID { get; set; }
        public DateTime Timescape { get; set; }
    }

    public class SaleGetDTO
    {
        public int BillNo { get; set; }
        public DateTime Timescape { get; set; }
        public int ItemCount { get; set; }
        public int BillPrice { get; set; }
    }

    public class SaleGetOneDTO
    {
        public int CartID { get; set; }
        public int BillNo { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public string ItemName { get; set; }
        public string Unit { get; set; }
        public double Price { get; set; }
        public double SoldQty { get; set; }
        public double SoldPrice { get; set; }
        public int SellerID { get; set; }
        public string UserName { get; set; }
        public DateTime Timescape { get; set; }
    }
}
