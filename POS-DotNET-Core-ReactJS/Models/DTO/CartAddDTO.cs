namespace POS_DotNET_Core_ReactJS.Models.DTO
{
    public class CartAddDTO
    {
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public double CartQty { get; set; }
        public double Price { get; set; }
        public int SellerID { get; set; }
    }
}
