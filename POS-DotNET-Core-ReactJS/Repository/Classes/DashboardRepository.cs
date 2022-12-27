using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Repository.Classes
{
    public class DashboardRepository : DatabaseConfig, IDashboardRepository
    {
        public List<DailySalesDashDTO> DailySales()
        {
            List<DailySalesDashDTO> data = new List<DailySalesDashDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
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
            catch(Exception ex)
            {
                return data;
            }
        }

        public List<MonthlySalesDashDTO> MonthlySales()
        {
            List<MonthlySalesDashDTO> data = new List<MonthlySalesDashDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
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
            catch(Exception ex)
            {
                return data;
            }
        }

        public List<UserCountDTO> UserCounts()
        {
            List<UserCountDTO> data = new List<UserCountDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UsersCount]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            data.Add(new UserCountDTO
                            {
                                Type = Convert.ToString(dr[0]),
                                NoOfUsers = Convert.ToInt32(dr[1])
                            });
                        }
                    }
                }
                return data;
            }
            catch(Exception ex)
            {
                return data;
            }
        }

        public int ItemCounts()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_ItemsCount]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            return Convert.ToInt32(dr[0]);
                        }
                    }
                }
                return 0;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        public int SuppliersCounts()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_SuppliersCount]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            return Convert.ToInt32(dr[0]);
                        }
                    }
                }
                return 0;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        public int GRNCounts()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GRNsCount]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            return Convert.ToInt32(dr[0]);
                        }
                    }
                }
                return 0;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        public List<DailySalesDashDTO> DailyBillCount()
        {
            List<DailySalesDashDTO> data = new List<DailySalesDashDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_dailyBillCounts]", con))
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
            catch(Exception ex)
            {
                return data;
            }
        }

        public List<MonthlySalesDashDTO> MonthlyBillCount()
        {
            List<MonthlySalesDashDTO> data = new List<MonthlySalesDashDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_MonthlyBillCounts]", con))
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
            catch(Exception ex)
            {
                return data;
            }
        }
    }
}
