namespace POS_DotNET_Core_ReactJS.Models.DTO
{
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
