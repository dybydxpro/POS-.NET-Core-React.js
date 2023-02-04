namespace POS_DotNET_Core_ReactJS.Models.DTO
{
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
}
