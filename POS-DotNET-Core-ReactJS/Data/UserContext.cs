using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Data
{
    public class UserContext:DatabaseConfig
    {
        public List<User> GetUser()
        {
            List<User> list = new List<User>();
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
                        list.Add(new User {
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

        public List<User> SearchUser(string text)
        {
            List<User> list = new List<User>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetSearchUsers", con))
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

        public UserEdit GetUserOnce(int id)
        {
            List<UserEdit> list = new List<UserEdit>();
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

        public bool EditUser(UserEdit obj)
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

        public bool CheckPassword(string un, string pw)
        {
            List<User> ur = new List<User>();
            //string query = $"EXEC [dbo].[sp_CheckPassword] @UserName = '{un}', @Password = '{pw}'";
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

        public bool AddUsers(User users)
        {
            users.Password = Md5(users.Password);
            //string query = $"EXEC [dbo].[sp_CreateUser] @Name = '{users.Name}', @NIC = '{users.NIC}', @Address = '{users.Address}', @UserName = '{users.UserName}', @Password = '{users.Password}', @Type = '{users.Type}']";
            using(SqlConnection con = new SqlConnection(Connection))
            {
                using(SqlCommand cmd = new SqlCommand("sp_CreateUser", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Name", users.Name);
                    cmd.Parameters.AddWithValue("@NIC", users.NIC);
                    cmd.Parameters.AddWithValue("@Address", users.Address);
                    cmd.Parameters.AddWithValue("@UserName", users.UserName);
                    cmd.Parameters.AddWithValue("@Password", users.Password);
                    cmd.Parameters.AddWithValue("@Type", users.Type);
                    if(con.State == ConnectionState.Closed)
                    {
                        con.Open();
                    }
                    int i = cmd.ExecuteNonQuery();
                    if(i >= 1)
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

        public bool ActiveDeactiveUser(int id)
        {
            //string query = $"EXEC [dbo].[sp_ActiveDeactiveUser] @UserID = {id}";
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

        public UserAccountDTO Login(string un, string pw)
        {
            pw = Md5(pw);
            List<UserAccountDTO> ur = new List<UserAccountDTO>();
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

        public bool ChangePassword(int id, string pw)
        {
            pw = Md5(pw);
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
