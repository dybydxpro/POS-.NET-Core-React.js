using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Repository.Classes
{
    public class ReturnRepository: DatabaseConfig, IReturnRepository
    {
        public List<ReturnItemGetDTO> GetReturn()
        {
            List<ReturnItemGetDTO> rets = new List<ReturnItemGetDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllReturns]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            rets.Add(new ReturnItemGetDTO
                            {
                                ReturnID = Convert.ToInt32(dr[0]),
                                BillID = Convert.ToInt32(dr[1]),
                                ItemID = Convert.ToInt32(dr[2]),
                                ItemName = Convert.ToString(dr[3]),
                                Unit = Convert.ToString(dr[4]),
                                StockID = Convert.ToInt32(dr[5]),
                                Qty = Convert.ToDouble(dr[6]),
                                Price = Convert.ToDouble(dr[7]),
                                ReturnerID = Convert.ToInt32(dr[8]),
                                ReturnerName = Convert.ToString(dr[9])
                            });
                        }
                    }
                }
                return rets;
            }
            catch(Exception ex)
            {
                return rets;
            }
        }

        public ReturnItemGetDTO GetOnce(int id)
        {
            List<ReturnItemGetDTO> rets = new List<ReturnItemGetDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetOneReturn]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ReturnID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            rets.Add(new ReturnItemGetDTO
                            {
                                ReturnID = Convert.ToInt32(dr[0]),
                                BillID = Convert.ToInt32(dr[1]),
                                ItemID = Convert.ToInt32(dr[2]),
                                ItemName = Convert.ToString(dr[3]),
                                Unit = Convert.ToString(dr[4]),
                                StockID = Convert.ToInt32(dr[5]),
                                Qty = Convert.ToDouble(dr[6]),
                                Price = Convert.ToDouble(dr[7]),
                                ReturnerID = Convert.ToInt32(dr[8]),
                                ReturnerName = Convert.ToString(dr[9])
                            });
                        }

                        ReturnItemGetDTO ret = new ReturnItemGetDTO();
                        if (rets.Count >= 1)
                        {
                            ret.ReturnID = Convert.ToInt32(rets[0].ReturnID);
                            ret.BillID = Convert.ToInt32(rets[0].ReturnID);
                            ret.ItemID = Convert.ToInt32(rets[0].ReturnID);
                            ret.ItemName = Convert.ToString(rets[0].ReturnID);
                            ret.Unit = Convert.ToString(rets[0].ReturnID);
                            ret.StockID = Convert.ToInt32(rets[0].ReturnID);
                            ret.Qty = Convert.ToDouble(rets[0].ReturnID);
                            ret.Price = Convert.ToDouble(rets[0].ReturnID);
                            ret.ReturnerID = Convert.ToInt32(rets[0].ReturnID);
                            ret.ReturnerName = Convert.ToString(rets[0].ReturnID);
                        }
                        else
                        {
                            ret.ReturnID = 0;
                            ret.BillID = 0;
                            ret.ItemID = 0;
                            ret.ItemName = "";
                            ret.Unit = "";
                            ret.StockID = 0;
                            ret.Qty = 0.00;
                            ret.Price = 0.00;
                            ret.ReturnerID = 0;
                            ret.ReturnerName = "";
                        }
                        return ret;
                    }
                }
            }
            catch(Exception ex)
            {
                ReturnItemGetDTO ret = new ReturnItemGetDTO();
                ret.ReturnID = 0;
                ret.BillID = 0;
                ret.ItemID = 0;
                ret.ItemName = "";
                ret.Unit = "";
                ret.StockID = 0;
                ret.Qty = 0.00;
                ret.Price = 0.00;
                ret.ReturnerID = 0;
                ret.ReturnerName = "";
                return ret;
            }
        }

        public List<ReturnItemGetDTO> GetReturn(string text)
        {
            List<ReturnItemGetDTO> rets = new List<ReturnItemGetDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSearchReturns]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Search", "%" + text + "%");
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            rets.Add(new ReturnItemGetDTO
                            {
                                ReturnID = Convert.ToInt32(dr[0]),
                                BillID = Convert.ToInt32(dr[1]),
                                ItemID = Convert.ToInt32(dr[2]),
                                ItemName = Convert.ToString(dr[3]),
                                Unit = Convert.ToString(dr[4]),
                                StockID = Convert.ToInt32(dr[5]),
                                Qty = Convert.ToDouble(dr[6]),
                                Price = Convert.ToDouble(dr[7]),
                                ReturnerID = Convert.ToInt32(dr[8]),
                                ReturnerName = Convert.ToString(dr[9])
                            });
                        }
                    }
                }
                return rets;
            }
            catch(Exception ex)
            {
                return rets;
            }
        }

        public bool PostReturn(ReturnItemCreateDTO obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_SetReturn]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@BillID", obj.BillID);
                        cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                        cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                        cmd.Parameters.AddWithValue("@Qty", obj.Qty);
                        cmd.Parameters.AddWithValue("@Price", obj.Price);
                        cmd.Parameters.AddWithValue("@ReturnerID", obj.ReturnerID);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i >= 1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public bool UpdateReturn(ReturnItem obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UpdateReturn]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ReturnID", obj.ReturnID);
                        cmd.Parameters.AddWithValue("@BillID", obj.BillID);
                        cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                        cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                        cmd.Parameters.AddWithValue("@Qty", obj.Qty);
                        cmd.Parameters.AddWithValue("@Price", obj.Price);
                        cmd.Parameters.AddWithValue("@ReturnerID", obj.ReturnerID);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i >= 1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public bool DeleteReturn(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_DeleteReturns]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ReturnID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i >= 1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
