using POS_.NET_Core_React.js.Models;
using POS_.NET_Core_React.js.Models.DTO;
using System.Data;
using System.Data.SqlClient;

namespace POS_.NET_Core_React.js.Data
{
    public class ItemContext:DatabaseConfig
    {
        public List<Item> GetItems()
        {
            List<Item> items = new List<Item>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using(SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllItems]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@", cmd);
                    if(con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        items.Add(new Item
                        {
                            ItemID = Convert.ToInt32(dr[0]),
                            ItemName = Convert.ToString(dr[1]),
                            Unit = Convert.ToString(dr[2])
                        });
                    }
                }
            }
            return items;
        }

        public Item GetOnce(int id)
        {
            List<Item> items = new List<Item>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetOnce]", con))
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
                        items.Add(new Item
                        {
                            ItemID = Convert.ToInt32(dr[0]),
                            ItemName = Convert.ToString(dr[1]),
                            Unit = Convert.ToString(dr[2])
                        });
                    }

                    Item item = new Item();
                    if(items.Count >= 1)
                    {
                        item.ItemID = Convert.ToInt32(items[0].ItemID);
                        item.ItemName = Convert.ToString(items[0].ItemName);
                        item.Unit = Convert.ToString(items[0].Unit);
                    }
                    else
                    {
                        item.ItemID = 0;
                        item.ItemName = "";
                        item.Unit = "";
                    }
                    return item;
                }
            }
        }

        public List<Item> SearchItems(string text)
        {
            List<Item> items = new List<Item>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSearchItems]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Search", "%"+text+"%");
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        items.Add(new Item
                        {
                            ItemID = Convert.ToInt32(dr[0]),
                            ItemName = Convert.ToString(dr[1]),
                            Unit = Convert.ToString(dr[2])
                        });
                    }
                }
            }
            return items;
        }

        public bool PostItems(ItemAdd obj)
        {
            List<Item> items = new List<Item>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateItem]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ItemName", obj.ItemName);
                    cmd.Parameters.AddWithValue("@Unit", obj.Unit);
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

        public bool UpdateItems(Item obj)
        {
            List<Item> items = new List<Item>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UpdateItems]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                    cmd.Parameters.AddWithValue("@ItemName", obj.ItemName);
                    cmd.Parameters.AddWithValue("@Unit", obj.Unit);
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
