using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IGRNCartRepository
    {
        List<GRNCartGetDTO> GetGRNCarts(int id);

        GRNCart GetOnceGRNCart(int id);

        bool PostGRNCarts(GRNCartAddDTO obj);

        bool UpdateGRNCarts(GRNCart obj);

        bool DeleteGRNCarts(int id);
    }
}
