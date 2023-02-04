using POS_DotNET_Core_ReactJS.Models;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IItemRepository
    {
        List<Item> GetItems();

        List<Item> GetItemsASC();

        Item GetOnce(int id);

        List<Item> SearchItems(string text);

        bool PostItems(ItemAddDTO obj);

        bool UpdateItems(Item obj);
    }
}
