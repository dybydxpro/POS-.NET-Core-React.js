using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models
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

    public class StockAddDTO
    {
        [Required]
        public int ItemID { get; set; }
        [Required]
        public decimal Qty { get; set; }
        [Required]
        public decimal Price { get; set; }
    }

    public class StockGetDTO
    {
        [Required]
        public int StockID { get; set; }
        [Required]
        public int ItemID { get; set; }
        [Required]
        public string ItemName { get; set; }
        [Required]
        public string Unit { get; set; }
        [Required]
        public double Qty { get; set; }
        [Required]
        public double Price { get; set; }

    }
}
