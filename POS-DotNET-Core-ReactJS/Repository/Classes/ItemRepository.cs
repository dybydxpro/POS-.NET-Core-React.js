using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Repository.Classes
{
    public class ItemRepository: DatabaseConfig, IItemRepository
    {
        public List<Item> GetItems()
        {
            List<Item> items = new List<Item>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllItems]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
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
            catch(Exception ex)
            {
                return items;
            }
        }

        public List<Item> GetItemsASC()
        {
            List<Item> items = new List<Item>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllItemsASC]", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
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
            catch(Exception ex)
            {
                return items;
            }
        }

        public Item GetOnce(int id)
        {
            List<Item> items = new List<Item>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetItemOnce]", con))
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
                        if (items.Count >= 1)
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
            catch (Exception ex)
            {
                Item item = new Item();
                item.ItemID = 0;
                item.ItemName = "";
                item.Unit = "";
                return item;
            }
        }

        public List<Item> SearchItems(string text)
        {
            List<Item> items = new List<Item>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSearchItems]", con))
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
            catch(Exception ex)
            {
                return items;
            }
        }

        public bool PostItems(ItemAddDTO obj)
        {
            List<Item> items = new List<Item>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
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
            catch(Exception ex)
            {
                return false;
            }
        }

        public bool UpdateItems(Item obj)
        {
            List<Item> items = new List<Item>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection()))
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
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
