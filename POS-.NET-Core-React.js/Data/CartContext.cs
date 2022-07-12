using POS_.NET_Core_React.js.Models;
using POS_.NET_Core_React.js.Models.DTO;
using System.Data;
using System.Data.SqlClient;

namespace POS_.NET_Core_React.js.Data
{
    public class CartContext:DatabaseConfig
    {
        public List<CartGetDTO> GetCarts(int id)
        {
            List<CartGetDTO> carts = new List<CartGetDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetCart]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SellerID", id);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        carts.Add(new CartGetDTO
                        {
                            CartID = Convert.ToInt32(dr[0]),
                            ItemID = Convert.ToInt32(dr[1]),
                            StockID = Convert.ToInt32(dr[2]),
                            ItemName = Convert.ToString(dr[3]),
                            Unit = Convert.ToString(dr[4]),
                            Price = Convert.ToDouble(dr[5]),
                            CartQty = Convert.ToDouble(dr[6]),
                            NetPrice = Convert.ToDouble(dr[7]),
                            SellerID = Convert.ToInt32(dr[8])
                        });
                    }
                }
            }
            return carts;
        }

        public CartGetDTO GetCartOnce(int id)
        {
            List<CartGetDTO> carts = new List<CartGetDTO>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetCartById]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CartID", id);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        carts.Add(new CartGetDTO
                        {
                            CartID = Convert.ToInt32(dr[0]),
                            ItemID = Convert.ToInt32(dr[1]),
                            StockID = Convert.ToInt32(dr[2]),
                            ItemName = Convert.ToString(dr[3]),
                            Unit = Convert.ToString(dr[4]),
                            Price = Convert.ToDouble(dr[5]),
                            CartQty = Convert.ToDouble(dr[6]),
                            NetPrice = Convert.ToDouble(dr[7]),
                            SellerID = Convert.ToInt32(dr[8])
                        });
                    }

                    CartGetDTO cart = new CartGetDTO();
                    if (carts.Count >= 1)
                    {
                        cart.CartID = Convert.ToInt32(carts[0].CartID);
                        cart.ItemID = Convert.ToInt32(carts[0].ItemID);
                        cart.StockID = Convert.ToInt32(carts[0].StockID);
                        cart.ItemName = Convert.ToString(carts[0].ItemName);
                        cart.Unit = Convert.ToString(carts[0].Unit);
                        cart.Price = Convert.ToDouble(carts[0].Price);
                        cart.CartQty = Convert.ToDouble(carts[0].CartQty);
                        cart.NetPrice = Convert.ToDouble(carts[0].NetPrice);
                        cart.SellerID = Convert.ToInt32(carts[0].SellerID);
                    }
                    else
                    {
                        cart.CartID = 0;
                        cart.ItemID = 0;
                        cart.StockID = 0;
                        cart.ItemName = "";
                        cart.Unit = "";
                        cart.Price = 0.00;
                        cart.CartQty = 0.00;
                        cart.NetPrice = 0.00;
                        cart.SellerID = 0;
                    }
                    return cart;
                }
            }
        }

        public bool PostCarts(CartAddDTO obj)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateCart]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                    cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                    cmd.Parameters.AddWithValue("@CartQty", obj.CartQty);
                    cmd.Parameters.AddWithValue("@Price", obj.Price);
                    cmd.Parameters.AddWithValue("@SellerID", obj.SellerID);
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

        public bool EditCarts(Cart obj)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UpdateCart]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CartID", obj.CartID);
                    cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                    cmd.Parameters.AddWithValue("@StockID", obj.StockID);
                    cmd.Parameters.AddWithValue("@CartQty", obj.CartQty);
                    cmd.Parameters.AddWithValue("@Price", obj.Price);
                    cmd.Parameters.AddWithValue("@SellerID", obj.SellerID);
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

        public bool DeleteCarts(int id)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_DropCart]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CartID", id);
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
