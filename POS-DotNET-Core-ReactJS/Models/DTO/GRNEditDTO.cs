namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class GRNEditDTO
    {
        public int GRNID { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public int GRNQty { get; set; }
        public double BulckPrice { get; set; }
        public string? Remarks { get; set; }
    }
}
