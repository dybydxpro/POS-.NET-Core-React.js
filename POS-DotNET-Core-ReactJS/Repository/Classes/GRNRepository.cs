using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Repository.Classes
{
    public class GRNRepository : DatabaseConfig, IGRNRepository
    {
        public List<GRNAllDTO> GetGRNs()
        {
            List<GRNAllDTO> grn = new List<GRNAllDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllGRNs]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            grn.Add(new GRNAllDTO
                            {
                                GRNNo = Convert.ToInt32(dr[0]),
                                GRNDate = Convert.ToDateTime(dr[1]),
                                InvoiceNo = Convert.ToString(dr[2]),
                                SupplierName = Convert.ToString(dr[3]),
                                ItemCount = Convert.ToInt32(dr[4]),
                                BillPrice = Convert.ToInt32(dr[5])
                            });
                        }
                    }
                }
                return grn;
            }
            catch(Exception ex)
            {
                return grn;
            }
        }

        public List<GRNGetOneDTO> GetGRNOnce(int id)
        {
            List<GRNGetOneDTO> grns = new List<GRNGetOneDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetGRNOnce]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@GRNNo", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            grns.Add(new GRNGetOneDTO
                            {
                                GRNID = Convert.ToInt32(dr[0]),
                                GRNNo = Convert.ToInt32(dr[1]),
                                GRNDate = Convert.ToDateTime(dr[2]),
                                InvoiceNo = Convert.ToString(dr[3]),
                                InvoiceDate = Convert.ToDateTime(dr[4]),
                                SupplierID = Convert.ToInt32(dr[5]),
                                SupplierName = Convert.ToString(dr[6]),
                                Address = Convert.ToString(dr[7]),
                                ContactNumber = Convert.ToString(dr[8]),
                                ItemID = Convert.ToInt32(dr[9]),
                                ItemName = Convert.ToString(dr[10]),
                                StockID = Convert.ToInt32(dr[11]),
                                Price = Convert.ToDouble(dr[12]),
                                Unit = Convert.ToString(dr[13]),
                                GRNQty = Convert.ToDouble(dr[14]),
                                PayType = Convert.ToString(dr[15]),
                                BulckPrice = Convert.ToDouble(dr[16]),
                                ActualBulkPrice = Convert.ToDouble(dr[17]),
                                UserName = Convert.ToString(dr[18]),
                                DueDate = Convert.ToDateTime(dr[19]),
                                Remarks = Convert.ToString(dr[20])
                            });
                        }
                        return grns;
                    }
                }
            }
            catch(Exception ex)
            {
                return grns;
            }
        }

        public List<GRNAllDTO> SearchGRNs(string text)
        {
            List<GRNAllDTO> grns = new List<GRNAllDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSearchGRNs]", con))
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
                            grns.Add(new GRNAllDTO
                            {
                                GRNNo = Convert.ToInt32(dr[0]),
                                GRNDate = Convert.ToDateTime(dr[1]),
                                InvoiceNo = Convert.ToString(dr[2]),
                                SupplierName = Convert.ToString(dr[3]),
                                ItemCount = Convert.ToInt32(dr[4]),
                                BillPrice = Convert.ToInt32(dr[5])
                            });
                        }
                    }
                }
                return grns;
            }
            catch(Exception ex)
            {
                return grns;
            }
        }

        public GRNEditDTO GetOneByIDGRNs(int id)
        {
            List<GRNEditDTO> grns = new List<GRNEditDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetOneByIDGRNs]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@GRNID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            grns.Add(new GRNEditDTO
                            {
                                GRNID = Convert.ToInt32(dr[0]),
                                ItemID = Convert.ToInt32(dr[1]),
                                StockID = Convert.ToInt32(dr[2]),
                                GRNQty = Convert.ToInt32(dr[3]),
                                BulckPrice = Convert.ToInt32(dr[4]),
                                Remarks = Convert.ToString(dr[2]),
                            });
                        }

                        GRNEditDTO grn = new GRNEditDTO();
                        if (grns.Count >= 1)
                        {
                            grn.GRNID = Convert.ToInt32(grns[0].GRNID);
                            grn.ItemID = Convert.ToInt32(grns[0].ItemID);
                            grn.StockID = Convert.ToInt32(grns[0].StockID);
                            grn.GRNQty = Convert.ToInt32(grns[0].GRNQty);
                            grn.BulckPrice = Convert.ToInt32(grns[0].BulckPrice);
                            grn.Remarks = Convert.ToString(grns[0].Remarks);
                        }
                        else
                        {
                            grn.GRNID = 0;
                            grn.ItemID = 0;
                            grn.StockID = 0;
                            grn.GRNQty = 0;
                            grn.BulckPrice = 0;
                            grn.Remarks = "";
                        }
                        return grn;
                    }
                }
            }
            catch(Exception ex)
            {
                GRNEditDTO grn = new GRNEditDTO();
                grn.GRNID = 0;
                grn.ItemID = 0;
                grn.StockID = 0;
                grn.GRNQty = 0;
                grn.BulckPrice = 0;
                grn.Remarks = "";
                return grn;
            }
        }

        public int GetMaxIDGRNs()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateMaxGRN]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);

                        if (dt.Rows.Count == 0)
                        {
                            return 0;
                        }

                        foreach (DataRow dr in dt.Rows)
                        {
                            int val = Convert.ToInt32(dr[0]);
                            return val;
                        }
                        return 0;
                    }
                }
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        public bool PostGRNs(GRNAddDTO obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateGRN]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@GRNNo", obj.GRNNo);
                        cmd.Parameters.AddWithValue("@GRNDate", obj.GRNDate);
                        cmd.Parameters.AddWithValue("@InvoiceNo", obj.InvoiceNo);
                        cmd.Parameters.AddWithValue("@InvoiceDate", obj.InvoiceDate);
                        cmd.Parameters.AddWithValue("@SupplierID", obj.SupplierID);
                        cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                        cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                        cmd.Parameters.AddWithValue("@GRNQty", obj.GRNQty);
                        cmd.Parameters.AddWithValue("@PayType", obj.PayType);
                        cmd.Parameters.AddWithValue("@BulckPrice", obj.BulckPrice);
                        cmd.Parameters.AddWithValue("@ActualBulkPrice", obj.ActualBulkPrice);
                        cmd.Parameters.AddWithValue("@GRNRecorderID", obj.GRNRecorderID);
                        cmd.Parameters.AddWithValue("@DueDate", obj.DueDate);
                        cmd.Parameters.AddWithValue("@Remarks", obj.Remarks);
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

        public bool PostAllGRNs(int id)
        {
            //try
            //{
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    con.Open();
                    //SqlTransaction transaction = con.BeginTransaction();

                    //try
                    //{
                        List<GRNCartGetDTO> grns = new List<GRNCartGetDTO>();
                        using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetGRNCart]", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@GRNRecorderID", id);
                            if (con.State == ConnectionState.Closed)
                                con.Open();
                            SqlDataAdapter adp = new SqlDataAdapter(cmd);
                            DataTable dt = new DataTable();
                            adp.Fill(dt);
                            foreach (DataRow dr in dt.Rows)
                            {
                                grns.Add(new GRNCartGetDTO
                                {
                                    GRNID = Convert.ToInt32(dr[0]),
                                    InvoiceNo = Convert.ToString(dr[1]),
                                    InvoiceDate = Convert.ToDateTime(dr[2]),
                                    SupplierID = Convert.ToInt32(dr[3]),
                                    SupplierName = Convert.ToString(dr[4]),
                                    Address = Convert.ToString(dr[5]),
                                    ContactNumber = Convert.ToString(dr[6]),
                                    ItemID = Convert.ToInt32(dr[7]),
                                    ItemName = Convert.ToString(dr[8]),
                                    StockID = Convert.ToInt32(dr[9]),
                                    Price = Convert.ToDouble(dr[10]),
                                    Unit = Convert.ToString(dr[11]),
                                    GRNQty = Convert.ToInt32(dr[12]),
                                    PayType = Convert.ToString(dr[13]),
                                    BulckPrice = Convert.ToDouble(dr[14]),
                                    ActualBulkPrice = Convert.ToDouble(dr[15]),
                                    UserName = Convert.ToString(dr[16]),
                                    DueDate = Convert.ToDateTime(dr[17]),
                                    Remarks = Convert.ToString(dr[18])
                                });
                            }
                        }

                        int maxID = GetMaxIDGRNs() + 1;
                        DateTime dtm = DateTime.Now;

                        foreach (GRNCartGetDTO obj in grns)
                        {
                            using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateGRN]", con))
                            {
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Parameters.AddWithValue("@GRNNo", maxID);
                                cmd.Parameters.AddWithValue("@GRNDate", dtm);
                                cmd.Parameters.AddWithValue("@InvoiceNo", obj.InvoiceNo);
                                cmd.Parameters.AddWithValue("@InvoiceDate", obj.InvoiceDate);
                                cmd.Parameters.AddWithValue("@SupplierID", obj.SupplierID);
                                cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                                cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                                cmd.Parameters.AddWithValue("@GRNQty", obj.GRNQty);
                                cmd.Parameters.AddWithValue("@PayType", obj.PayType);
                                cmd.Parameters.AddWithValue("@BulckPrice", obj.BulckPrice);
                                cmd.Parameters.AddWithValue("@ActualBulkPrice", obj.ActualBulkPrice);
                                cmd.Parameters.AddWithValue("@GRNRecorderID", id);
                                cmd.Parameters.AddWithValue("@DueDate", obj.DueDate);
                                cmd.Parameters.AddWithValue("@Remarks", obj.Remarks);
                                if (con.State == ConnectionState.Closed)
                                    con.Open();
                                int i = cmd.ExecuteNonQuery();
                                if (i >= 1)
                                {
                                    using (SqlCommand cmds = new SqlCommand("[dbo].[sp_DropGRNCart]", con))
                                    {
                                        cmd.CommandType = CommandType.StoredProcedure;
                                        cmd.Parameters.AddWithValue("@GRNID", id);
                                        if (con.State == ConnectionState.Closed)
                                            con.Open();
                                        cmds.ExecuteNonQuery();
                                    }
                                }
                            }
                        }

                        //transaction.Commit();
                        return true;
                    //}
                    //catch (Exception ex)
                    //{
                    //    transaction.Rollback();
                    //    return false;
                    //}
                }
            //}
            //catch (Exception ex)
            //{
            //    return false;
            //}//}
        }

        public bool EditGRNs(GRNEditDTO obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UpdateGRN]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@GRNID", obj.GRNID);
                        cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                        cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                        cmd.Parameters.AddWithValue("@GRNQty", obj.GRNQty);
                        cmd.Parameters.AddWithValue("@BulckPrice", obj.BulckPrice);
                        cmd.Parameters.AddWithValue("@Remarks", obj.Remarks);
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
