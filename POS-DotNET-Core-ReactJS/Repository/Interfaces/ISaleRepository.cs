using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface ISaleRepository
    {
        List<SaleGetDTO> GetSales();

        List<SaleGetDTO> GetSearchSales(string text);

        List<SaleGetOneDTO> GetBill(int billid);

        SaleGetOneDTO GetSaleOnce(int id);

        bool PostSales(SaleAddInDTO obj);

        int GetMaxIDSeles();
    }
}
