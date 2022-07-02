using System.ComponentModel.DataAnnotations;

namespace SalesApp.Models
{
    public class Sales
    {
        [Key]
        public int SalesID { get; set; }
        public string InvNo { get; set; }
        public DateTime SalesDate { get; set; }
        public double Amount { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string SalesType { get; set; }
    }
}
