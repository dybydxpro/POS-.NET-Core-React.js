using POS_DotNET_Core_ReactJS.Models.DTO;
using POS_DotNET_Core_ReactJS.Models;
using System.Data.SqlClient;
using System.Data;

namespace POS_DotNET_Core_ReactJS.Data
{
    public class SaleContext:DatabaseConfig
    {
        public List<SaleGetDTO> GetSales()
        {
            List<SaleGetDTO> sales = new List<SaleGetDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllSale]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        sales.Add(new SaleGetDTO
                        {
                            BillNo = Convert.ToInt32(dr[0]),
                            Timescape = Convert.ToDateTime(dr[1]),
                            ItemCount = Convert.ToInt32(dr[2]),
                            BillPrice = Convert.ToInt32(dr[3])
                        });
                    }
                }
            }
            return sales;
        }

        public List<SaleGetDTO> GetSearchSales(string text)
        {
            List<SaleGetDTO> sales = new List<SaleGetDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSearchBills]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Search", text);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        sales.Add(new SaleGetDTO
                        {
                            BillNo = Convert.ToInt32(dr[0]),
                            Timescape = Convert.ToDateTime(dr[1]),
                            ItemCount = Convert.ToInt32(dr[2]),
                            BillPrice = Convert.ToInt32(dr[3])
                        });
                    }
                }
            }
            return sales;
        }

        public List<SaleGetOneDTO> GetBill(int billid)
        {
            List<SaleGetOneDTO> sales = new List<SaleGetOneDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSaleByBill]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BillNo", billid);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        sales.Add(new SaleGetOneDTO
                        {
                            CartID = Convert.ToInt32(dr[0]),
                            BillNo = Convert.ToInt32(dr[1]),
                            ItemID = Convert.ToInt32(dr[2]),
                            StockID = Convert.ToInt32(dr[3]),
                            ItemName = Convert.ToString(dr[4]),
                            Unit = Convert.ToString(dr[5]),
                            Price = Convert.ToDouble(dr[6]),
                            SoldQty = Convert.ToDouble(dr[7]),
                            SoldPrice = Convert.ToDouble(dr[8]),
                            SellerID = Convert.ToInt32(dr[9]),
                            UserName = Convert.ToString(dr[10]),
                            Timescape = Convert.ToDateTime(dr[11])
                        });
                    }
                }
            }
            return sales;
        }

        public SaleGetOneDTO GetSaleOnce(int id)
        {
            List<SaleGetOneDTO> sales = new List<SaleGetOneDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSaleByBill]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BillNo", id);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        sales.Add(new SaleGetOneDTO
                        {
                            CartID = Convert.ToInt32(dr[0]),
                            BillNo = Convert.ToInt32(dr[1]),
                            ItemID = Convert.ToInt32(dr[2]),
                            StockID = Convert.ToInt32(dr[3]),
                            ItemName = Convert.ToString(dr[4]),
                            Unit = Convert.ToString(dr[5]),
                            Price = Convert.ToDouble(dr[6]),
                            SoldQty = Convert.ToDouble(dr[7]),
                            SoldPrice = Convert.ToDouble(dr[8]),
                            SellerID = Convert.ToInt32(dr[9]),
                            UserName = Convert.ToString(dr[10]),
                            Timescape = Convert.ToDateTime(dr[11])
                        });
                    }

                    SaleGetOneDTO sale = new SaleGetOneDTO();
                    if (sales.Count >= 1)
                    {
                        sale.CartID = Convert.ToInt32(sales[0].CartID);
                        sale.BillNo = Convert.ToInt32(sales[0].BillNo);
                        sale.ItemID = Convert.ToInt32(sales[0].ItemID);
                        sale.StockID = Convert.ToInt32(sales[0].StockID);
                        sale.ItemName = Convert.ToString(sales[0].ItemName);
                        sale.Unit = Convert.ToString(sales[0].Unit);
                        sale.Price = Convert.ToDouble(sales[0].Price);
                        sale.SoldQty = Convert.ToDouble(sales[0].SoldQty);
                        sale.SoldPrice = Convert.ToDouble(sales[0].SoldPrice);
                        sale.SellerID = Convert.ToInt32(sales[0].SellerID);
                        sale.UserName = Convert.ToString(sales[0].UserName);
                        sale.Timescape = Convert.ToDateTime(sales[0].Timescape);
                    }
                    else
                    {
                        sale.CartID = 0;
                        sale.BillNo = 0;
                        sale.ItemID = 0;
                        sale.StockID = 0;
                        sale.ItemName = "";
                        sale.Unit = "";
                        sale.Price = 0.00;
                        sale.SoldQty = 0.00;
                        sale.SoldPrice = 0.00;
                        sale.SellerID = 0;
                        sale.UserName = "";
                        sale.Timescape = Convert.ToDateTime("2000-01-01T00:00:00"); ;
                    }
                    return sale;
                }
            }
        }

        public bool PostSales(SaleAddInDTO obj)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateSale]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BillNo", obj.BillNo);
                    cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                    cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                    cmd.Parameters.AddWithValue("@SoldQty", obj.SoldQty);
                    cmd.Parameters.AddWithValue("@SoldPrice", obj.SoldPrice);
                    cmd.Parameters.AddWithValue("@SellerID", obj.SellerID);
                    cmd.Parameters.AddWithValue("@Timescape", obj.Timescape);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);

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

        public int GetMaxIDSeles()
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateMaxBill]", con))
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
    }
}
