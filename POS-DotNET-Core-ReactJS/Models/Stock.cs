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
}
