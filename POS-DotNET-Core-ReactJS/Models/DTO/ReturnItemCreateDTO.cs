namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class ReturnItemCreateDTO
    {
        public int BillID { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public double Qty { get; set; }
        public double Price { get; set; }
        public int ReturnerID { get; set; }
    }
}
