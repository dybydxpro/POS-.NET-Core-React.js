using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Data
{
    public class StockContext:DatabaseConfig
    {
        public List<StockGetDTO> GetStocks()
        {
            List<StockGetDTO> stocks = new List<StockGetDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllStocks]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        stocks.Add(new StockGetDTO
                        {
                            StockID = Convert.ToInt32(dr[0]),
                            ItemID = Convert.ToInt32(dr[1]),
                            ItemName = Convert.ToString(dr[2]),
                            Unit = Convert.ToString(dr[3]),
                            Qty = Convert.ToDouble(dr[4]),
                            Price = Convert.ToDouble(dr[5])
                        });
                    }
                }
            }
            return stocks;
        }

        public List<Stock> GetStocksASC(int id)
        {
            List<Stock> stocks = new List<Stock>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllStocksASC]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ItemID", id);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        stocks.Add(new Stock
                        {
                            StockID = Convert.ToInt32(dr[0]),
                            ItemID = Convert.ToInt32(dr[1]),
                            Qty = Convert.ToDouble(dr[2]),
                            Price = Convert.ToDouble(dr[3])
                        });
                    }
                }
            }
            return stocks;
        }

        public StockGetDTO GetOnce(int id)
        {
            List<StockGetDTO> stocks = new List<StockGetDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetStockOnce]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@StockID", id);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        stocks.Add(new StockGetDTO
                        {
                            StockID = Convert.ToInt32(dr[0]),
                            ItemID = Convert.ToInt32(dr[1]),
                            ItemName = Convert.ToString(dr[2]),
                            Unit = Convert.ToString(dr[3]),
                            Qty = Convert.ToDouble(dr[4]),
                            Price = Convert.ToDouble(dr[5])
                        });
                    }

                    StockGetDTO stock = new StockGetDTO();
                    if (stocks.Count >= 1)
                    {
                        stock.StockID = Convert.ToInt32(stocks[0].StockID);
                        stock.ItemID = Convert.ToInt32(stocks[0].ItemID);
                        stock.ItemName = Convert.ToString(stocks[0].ItemName);
                        stock.Unit = Convert.ToString(stocks[0].Unit);
                        stock.Qty = Convert.ToDouble(stocks[0].Qty);
                        stock.Price = Convert.ToDouble(stocks[0].Price);
                    }
                    else
                    {
                        stock.StockID = 0;
                        stock.ItemID = 0;
                        stock.ItemName = "";
                        stock.Unit = "";
                        stock.Qty = 0.00;
                        stock.Price = 0.00;
                    }
                    return stock;
                }
            }
        }

        public List<StockGetDTO> SearchStocks(string text)
        {
            List<StockGetDTO> stocks = new List<StockGetDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSearchStocks]", con))
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
                        stocks.Add(new StockGetDTO
                        {
                            StockID = Convert.ToInt32(dr[0]),
                            ItemID = Convert.ToInt32(dr[1]),
                            ItemName = Convert.ToString(dr[2]),
                            Unit = Convert.ToString(dr[3]),
                            Qty = Convert.ToDouble(dr[4]),
                            Price = Convert.ToDouble(dr[5])
                        });
                    }
                }
            }
            return stocks;
        }

        public bool PostStocks(StockAddDTO obj)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateStock]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                    cmd.Parameters.AddWithValue("@Qty", Math.Round(obj.Qty, 2));
                    cmd.Parameters.AddWithValue("@Price", Math.Round(obj.Price, 2));
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

        public bool UpdateStocks(Stock obj)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UpdateStocks]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                    cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                    cmd.Parameters.AddWithValue("@Qty", Math.Round(obj.Qty, 2));
                    cmd.Parameters.AddWithValue("@Price", Math.Round(obj.Price, 2));
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
    }
}
