using POS_DotNET_Core_ReactJS.Models;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IDashboardRepository
    {
        List<DailySalesDashDTO> DailySales();

        List<MonthlySalesDashDTO> MonthlySales();

        List<UserCountDTO> UserCounts();

        int ItemCounts();

        int SuppliersCounts();

        int GRNCounts();

        List<DailySalesDashDTO> DailyBillCount();

        List<MonthlySalesDashDTO> MonthlyBillCount();
    }
}
