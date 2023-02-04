using POS_DotNET_Core_ReactJS.Models;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IStockRepository
    {
        List<StockGetDTO> GetStocks();

        List<Stock> GetStocksASC(int id);

        StockGetDTO GetOnce(int id);

        List<StockGetDTO> SearchStocks(string text);

        bool PostStocks(StockAddDTO obj);

        bool UpdateStocks(Stock obj);
    }
}
