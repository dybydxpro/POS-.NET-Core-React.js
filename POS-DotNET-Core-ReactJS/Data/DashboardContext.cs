using POS_DotNET_Core_ReactJS.Models.DTO;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Data
{
    public class DashboardContext: DatabaseConfig
    {
        public List<DailySalesDashDTO> DailySales()
        {
            List<DailySalesDashDTO> data = new List<DailySalesDashDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_dailySales]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        data.Add(new DailySalesDashDTO
                        {
                            Date = Convert.ToDateTime(dr[0]),
                            TotalSales = Convert.ToInt32(dr[1]),
                        });
                    }
                }
            }
            return data;
        }

        public List<MonthlySalesDashDTO> MonthlySales()
        {
            List<MonthlySalesDashDTO> data = new List<MonthlySalesDashDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_MonthlySales]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        data.Add(new MonthlySalesDashDTO
                        {
                            Month = Convert.ToString(dr[0]),
                            TotalSales = Convert.ToInt32(dr[1])
                        });
                    }
                }
            }
            return data;
        }
    }
}
