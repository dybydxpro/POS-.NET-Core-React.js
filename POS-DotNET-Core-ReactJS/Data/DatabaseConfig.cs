using Microsoft.EntityFrameworkCore;
using POS_DotNET_Core_ReactJS.Models;

namespace POS_DotNET_Core_ReactJS.Data
{
    public class DatabaseConfig
    {
        public string Connection()
        {
            return "Data Source=THARINDUD\\SQLEXPRESS;Database=POSSystem_v2;Trusted_Connection=True;MultipleActiveResultSets=True;Integrated Security=True;";
            //return "Data Source=THARINDUD\\SQLEXPRESS;Database=POSSystem_v2;Trusted_Connection=True;MultipleActiveResultSets=True;Integrated Security=True;";
            //return Convert.ToString(_configuration.GetValue<string>("ConnectionStrings:DefaultConnecion"));
        }
    }
}