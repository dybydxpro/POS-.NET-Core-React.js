namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class GRNGetOneDTO
    {
        public int GRNID { get; set; }
        public int GRNNo { get; set; }
        public DateTime GRNDate { get; set; }
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
        public DateTime? DueDate { get; set; } = null;
        public string? Remarks { get; set; }
    }
}
