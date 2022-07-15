using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models.DTO
{
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
