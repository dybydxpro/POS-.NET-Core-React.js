namespace POS_DotNET_Core_ReactJS.Models
{
    public class ReturnItem
    {
        public int ReturnID { get; set; }
        public int BillID { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public double Qty { get; set; }
        public double Price { get; set; }
        public int ReturnerID { get; set; }
    }

    public class ReturnItemCreateDTO
    {
        public int BillID { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public double Qty { get; set; }
        public double Price { get; set; }
        public int ReturnerID { get; set; }
    }

    public class ReturnItemGetDTO
    {
        public int ReturnID { get; set; }
        public int BillID { get; set; }
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public string Unit { get; set; }
        public int StockID { get; set; }
        public double Qty { get; set; }
        public double Price { get; set; }
        public int ReturnerID { get; set; }
        public string ReturnerName { get; set; }
    }
}
