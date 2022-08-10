using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IReturnRepository
    {
        List<ReturnItemGetDTO> GetReturn();

        ReturnItemGetDTO GetOnce(int id);

        List<ReturnItemGetDTO> GetReturn(string text);

        bool PostReturn(ReturnItemCreateDTO obj);

        bool UpdateReturn(ReturnItem obj);

        bool DeleteReturn(int id);
    }
}
