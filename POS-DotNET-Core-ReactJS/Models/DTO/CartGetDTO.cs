namespace POS_.NET_Core_React.js.Models.DTO
{
    public class CartGetDTO
    {
        public int CartID { get; set; }
        public int ItemID { get; set; }
        public int StockID { get; set; }
        public string ItemName { get; set; }
        public string Unit { get; set; }
        public double Price { get; set; }
        public double CartQty { get; set; }
        public double NetPrice { get; set; }
        public int SellerID { get; set; }
    }
}
