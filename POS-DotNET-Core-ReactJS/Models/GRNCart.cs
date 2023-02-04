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

    public class GRNCartAddDTO
    {
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int SupplierID { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public int GRNQty { get; set; }
        public string PayType { get; set; }
        public double BulckPrice { get; set; }
        public double ActualBulkPrice { get; set; }
        public int GRNRecorderID { get; set; }
        public DateTime? DueDate { get; set; }
        public string? Remarks { get; set; }
    }

    public class GRNCartGetDTO
    {
        public int GRNID { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int SupplierID { get; set; }
        public string SupplierName { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public int StockID { get; set; }
        public double Price { get; set; }
        public string Unit { get; set; }
        public double GRNQty { get; set; }
        public string PayType { get; set; }
        public double BulckPrice { get; set; }
        public double ActualBulkPrice { get; set; }
        public string UserName { get; set; }
        public DateTime? DueDate { get; set; }
        public string? Remarks { get; set; }
    }
}
