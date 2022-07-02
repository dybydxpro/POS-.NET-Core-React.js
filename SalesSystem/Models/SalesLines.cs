using System.ComponentModel.DataAnnotations;

namespace SalesApp.Models
{
    public class SalesLines
    {
        [Key]
        public int SalesLineID { get; set; }
        public int SSalesID { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public double Total { get; set; }
    }
}
