using POS_.NET_Core_React.js.Models.DTO;
using POS_.NET_Core_React.js.Models;
using System.Data.SqlClient;
using System.Data;

namespace POS_.NET_Core_React.js.Data
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
                            BillNo = Convert.ToInt32(dr[0]),
                            ItemID = Convert.ToInt32(dr[1]),
                            StockID = Convert.ToInt32(dr[2]),
                            ItemName = Convert.ToString(dr[3]),
                            Unit = Convert.ToString(dr[4]),
                            Price = Convert.ToDouble(dr[5]),
                            SoldQty = Convert.ToDouble(dr[6]),
                            SoldPrice = Convert.ToDouble(dr[7]),
                            SellerID = Convert.ToInt32(dr[8]),
                            UserName = Convert.ToString(dr[9]),
                            Timescape = Convert.ToDateTime(dr[10])
                        });
                    }

                    SaleGetOneDTO sale = new SaleGetOneDTO();
                    if (sales.Count >= 1)
                    {
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

                    if (dt.Rows.Count > 0)
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
