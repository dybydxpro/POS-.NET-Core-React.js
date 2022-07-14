namespace POS_.NET_Core_React.js.Models.DTO
{
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
        public DateTime? DueDate { get; set; } = null;
        public string? Remarks { get; set; }
    }
}
