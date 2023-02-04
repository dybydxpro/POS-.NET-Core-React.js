namespace POS_DotNET_Core_ReactJS.Models
{
    public class Dashboard
    {
    }

    public class DailySalesDashDTO
    {
        public DateTime Date { get; set; }
        public double TotalSales { get; set; }
    }

    public class MonthlySalesDashDTO
    {
        public string Month { get; set; }
        public double TotalSales { get; set; }
    }
}
