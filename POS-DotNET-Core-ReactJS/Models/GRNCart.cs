using System.ComponentModel.DataAnnotations;

namespace POS_DotNET_Core_ReactJS.Models
{
    public class GRNCart
    {
        [Key]
        public int GRNID { get; set; }
        [Required]
        public string InvoiceNo { get; set; }
        [Required]
        public DateTime InvoiceDate { get; set; }
        [Required]
        public int SupplierID { get; set; }
        [Required]
        public int ItemID { get; set; }
        [Required]
        public int StockID { get; set; }
        [Required]
        public int GRNQty { get; set; }
        [Required]
        public string PayType { get; set; }
        [Required]
        public double BulckPrice { get; set; }
        [Required]
        public double ActualBulkPrice { get; set; }
        [Required]
        public int GRNRecorderID { get; set; }
        public DateTime? DueDate { get; set; } = null;
        public string? Remarks { get; set; }
    }
}
