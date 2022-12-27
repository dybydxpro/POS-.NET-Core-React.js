using POS_DotNET_Core_ReactJS.Models;

namespace POS_DotNET_Core_ReactJS.Repository.Interfaces
{
    public interface IAuthRepository
    {
        public string GenarateToken(UserAccountDTO userAccountDTO);
    }
}
