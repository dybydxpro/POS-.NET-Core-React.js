using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetUser();

        List<User> SearchUser(string text);

        UserEdit GetUserOnce(int id);

        bool EditUser(UserEdit obj);

        bool CheckPassword(string un, string pw);

        bool AddUsers(User users);

        bool ActiveDeactiveUser(int id);

        UserAccountDTO Login(string un, string pw);

        bool ChangePassword(int id, string pw);
    }
}
