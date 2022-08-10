using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

namespace POS_DotNET_Core_ReactJS.Repository.Classes
{
    public class UserRepository: DatabaseConfig, IUserRepository
    {
        public List<User> GetUser()
        {
            List<User> list = new List<User>();
            try
            {
                string query = "EXEC [dbo].[sp_GetAllUsers]";
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand(query))
                    {
                        cmd.Connection = con;
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            list.Add(new User
                            {
                                UserID = Convert.ToInt32(dr[0]),
                                Name = Convert.ToString(dr[1]),
                                NIC = Convert.ToString(dr[2]),
                                Address = Convert.ToString(dr[3]),
                                UserName = Convert.ToString(dr[4]),
                                Password = "",
                                Type = Convert.ToString(dr[5]),
                                Status = Convert.ToBoolean(dr[6])
                            });
                        }
                        return list;
                    }
                }
            }
            catch(Exception ex)
            {
                return list;
            }
            
        }

        public List<User> SearchUser(string text)
        {
            List<User> list = new List<User>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_GetSearchUsers", con))
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
                            list.Add(new User
                            {
                                UserID = Convert.ToInt32(dr[0]),
                                Name = Convert.ToString(dr[1]),
                                NIC = Convert.ToString(dr[2]),
                                Address = Convert.ToString(dr[3]),
                                UserName = Convert.ToString(dr[4]),
                                Password = "",
                                Type = Convert.ToString(dr[5]),
                                Status = Convert.ToBoolean(dr[6])
                            });
                        }
                    }
                }
                return list;
            }
            catch(Exception ex)
            {
                return list;
            }
            
        }

        public UserEdit GetUserOnce(int id)
        {
            List<UserEdit> list = new List<UserEdit>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_GetByOne", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", id);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            list.Add(new UserEdit
                            {
                                UserID = Convert.ToInt32(dr[0]),
                                Name = Convert.ToString(dr[1]),
                                NIC = Convert.ToString(dr[2]),
                                Address = Convert.ToString(dr[3]),
                                Type = Convert.ToString(dr[4]),
                            });
                        }

                        UserEdit uad = new UserEdit();
                        if (list.Count >= 1)
                        {
                            uad.UserID = list[0].UserID;
                            uad.Name = list[0].Name;
                            uad.NIC = list[0].NIC;
                            uad.Address = list[0].Address;
                            uad.Type = list[0].Type;
                            return uad;
                        }
                        else
                        {
                            uad.UserID = 0;
                            uad.Name = "";
                            uad.NIC = "";
                            uad.Address = "";
                            uad.Type = "";
                            return uad;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                UserEdit uad = new UserEdit();
                uad.UserID = 0;
                uad.Name = "";
                uad.NIC = "";
                uad.Address = "";
                uad.Type = "";
                return uad;
            }
            
        }

        public bool EditUser(UserEdit obj)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_EditUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", obj.UserID);
                        cmd.Parameters.AddWithValue("@Name", obj.Name);
                        cmd.Parameters.AddWithValue("@NIC", obj.NIC);
                        cmd.Parameters.AddWithValue("@Address", obj.Address);
                        cmd.Parameters.AddWithValue("@Type", obj.Type);
                        if (con.State == ConnectionState.Closed)
                        {
                            con.Open();
                        }
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

        public bool CheckPassword(string un, string pw)
        {
            List<User> ur = new List<User>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_CheckPassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserName", un);
                        cmd.Parameters.AddWithValue("@Password", pw);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            ur.Add(new User
                            {
                                UserID = Convert.ToInt32(dr[0]),
                                Name = Convert.ToString(dr[1]),
                                NIC = Convert.ToString(dr[2]),
                                Address = Convert.ToString(dr[3]),
                                UserName = Convert.ToString(dr[4]),
                                Password = "",
                                Type = Convert.ToString(dr[6]),
                                Status = Convert.ToBoolean(dr[7])
                            });
                        }
                        //int i = cmd.ExecuteNonQuery();
                        if (ur.Count >= 1)
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

        public bool AddUsers(User users)
        {
            try
            {
                users.Password = Md5(users.Password);
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_CreateUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Name", users.Name);
                        cmd.Parameters.AddWithValue("@NIC", users.NIC);
                        cmd.Parameters.AddWithValue("@Address", users.Address);
                        cmd.Parameters.AddWithValue("@UserName", users.UserName);
                        cmd.Parameters.AddWithValue("@Password", users.Password);
                        cmd.Parameters.AddWithValue("@Type", users.Type);
                        if (con.State == ConnectionState.Closed)
                        {
                            con.Open();
                        }
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

        public bool ActiveDeactiveUser(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ActiveDeactiveUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", id);

                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        int i = cmd.ExecuteNonQuery();
                        if (i > 0)
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

        public UserAccountDTO Login(string un, string pw)
        {
            pw = Md5(pw);
            List<UserAccountDTO> ur = new List<UserAccountDTO>();
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_Login", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserName", un);
                        cmd.Parameters.AddWithValue("@Password", pw);
                        if (con.State == ConnectionState.Closed)
                            con.Open();
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adp.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            ur.Add(new UserAccountDTO
                            {
                                UserID = Convert.ToInt32(dr[0]),
                                UserName = Convert.ToString(dr[1]),
                                Type = Convert.ToString(dr[2]),
                            });
                        }
                        UserAccountDTO uad = new UserAccountDTO();
                        if (ur.Count >= 1)
                        {
                            uad.UserID = ur[0].UserID;
                            uad.UserName = ur[0].UserName;
                            uad.Type = ur[0].Type;
                            return uad;
                        }
                        else
                        {
                            uad.UserID = 0;
                            uad.UserName = "";
                            uad.Type = "";
                            return uad;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                UserAccountDTO uad = new UserAccountDTO();
                uad.UserID = 0;
                uad.UserName = "";
                uad.Type = "";
                return uad;
            }
        }

        public bool ChangePassword(int id, string pw)
        {
            pw = Md5(pw);
            try
            {
                using (SqlConnection con = new SqlConnection(Connection))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ResetPassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", id);
                        cmd.Parameters.AddWithValue("@Password", pw);
                        if (con.State == ConnectionState.Closed)
                        {
                            con.Open();
                        }
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

        //Password Encription
        public static string Md5(string input)
        {
            MD5 md5 = MD5.Create();
            byte[] data = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
                sb.Append(data[i].ToString("x2"));
            return sb.ToString();
        }
    }
}
