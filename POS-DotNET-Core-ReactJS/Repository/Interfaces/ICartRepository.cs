using POS_DotNET_Core_ReactJS.Models;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface ICartRepository
    {
        List<CartGetDTO> GetCarts(int id);

        CartGetDTO GetCartOnce(int id);

        bool PostCarts(CartAddDTO obj);

        bool EditCarts(Cart obj);

        bool DeleteCarts(int id);
    }
}
