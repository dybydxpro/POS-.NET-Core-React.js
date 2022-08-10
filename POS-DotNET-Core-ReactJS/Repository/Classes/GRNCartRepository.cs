using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Repository.Classes
{
    public class GRNCartRepository : DatabaseConfig, IGRNCartRepository
    {
        public List<GRNCartGetDTO> GetGRNCarts(int id)
        {
            List<GRNCartGetDTO> grns = new List<GRNCartGetDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
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
                }
                return grns;
            }
            catch(Exception ex)
            {
                return grns;
            }
        }

        public GRNCart GetOnceGRNCart(int id)
        {
            List<GRNCart> grns = new List<GRNCart>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetGRNCartOnce]", con))
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
                            grns.Add(new GRNCart
                            {
                                GRNID = Convert.ToInt32(dr[0]),
                                InvoiceNo = Convert.ToString(dr[1]),
                                InvoiceDate = Convert.ToDateTime(dr[2]),
                                SupplierID = Convert.ToInt32(dr[3]),
                                ItemID = Convert.ToInt32(dr[4]),
                                StockID = Convert.ToInt32(dr[5]),
                                GRNQty = Convert.ToInt32(dr[6]),
                                PayType = Convert.ToString(dr[7]),
                                BulckPrice = Convert.ToDouble(dr[8]),
                                ActualBulkPrice = Convert.ToDouble(dr[9]),
                                GRNRecorderID = Convert.ToInt32(dr[10]),
                                DueDate = Convert.ToDateTime(dr[11]),
                                Remarks = Convert.ToString(dr[12])
                            });
                        }

                        GRNCart grn = new GRNCart();
                        if (grns.Count >= 1)
                        {
                            grn.GRNID = Convert.ToInt32(grns[0].GRNID);
                            grn.InvoiceNo = Convert.ToString(grns[0].InvoiceNo);
                            grn.InvoiceDate = Convert.ToDateTime(grns[0].InvoiceDate);
                            grn.SupplierID = Convert.ToInt32(grns[0].SupplierID);
                            grn.ItemID = Convert.ToInt32(grns[0].ItemID);
                            grn.StockID = Convert.ToInt32(grns[0].StockID);
                            grn.GRNQty = Convert.ToInt32(grns[0].GRNQty);
                            grn.PayType = Convert.ToString(grns[0].PayType);
                            grn.BulckPrice = Convert.ToDouble(grns[0].BulckPrice);
                            grn.ActualBulkPrice = Convert.ToDouble(grns[0].ActualBulkPrice);
                            grn.GRNRecorderID = Convert.ToInt32(grns[0].GRNRecorderID);
                            grn.DueDate = Convert.ToDateTime(grns[0].DueDate);
                            grn.Remarks = Convert.ToString(grns[0].Remarks);
                        }
                        else
                        {
                            grn.GRNID = 0;
                            grn.InvoiceNo = "";
                            grn.InvoiceDate = Convert.ToDateTime("2000-01-01T00:00:00.000Z");
                            grn.SupplierID = 0;
                            grn.ItemID = 0;
                            grn.StockID = 0;
                            grn.GRNQty = 0;
                            grn.PayType = "";
                            grn.BulckPrice = 0.00;
                            grn.ActualBulkPrice = 0.00;
                            grn.GRNRecorderID = 0;
                            grn.DueDate = Convert.ToDateTime("2000-01-01T00:00:00.000Z");
                            grn.Remarks = "";
                        }
                        return grn;
                    }
                }
            }
            catch(Exception ex)
            {
                GRNCart grn = new GRNCart();
                grn.GRNID = 0;
                grn.InvoiceNo = "";
                grn.InvoiceDate = Convert.ToDateTime("2000-01-01T00:00:00.000Z");
                grn.SupplierID = 0;
                grn.ItemID = 0;
                grn.StockID = 0;
                grn.GRNQty = 0;
                grn.PayType = "";
                grn.BulckPrice = 0.00;
                grn.ActualBulkPrice = 0.00;
                grn.GRNRecorderID = 0;
                grn.DueDate = Convert.ToDateTime("2000-01-01T00:00:00.000Z");
                grn.Remarks = "";
                return grn;
            }
        }

        public bool PostGRNCarts(GRNCartAddDTO obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateGRNCart]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
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

        public bool UpdateGRNCarts(GRNCart obj)
        {
            List<GRNCart> grns = new List<GRNCart>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UpdateGRNCart]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@GRNID", obj.GRNID);
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

        public bool DeleteGRNCarts(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_DropGRNCart]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@GRNID", id);
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
