using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;
using System.Data;
using System.Data.SqlClient;

namespace POS_DotNET_Core_ReactJS.Data
{
    public class SupplierContext:DatabaseConfig
    {
        public List<Supplier> GetSuppliers()
        {
            List<Supplier> suppliers = new List<Supplier>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllSuppliers]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        suppliers.Add(new Supplier
                        {
                            SupplierID = Convert.ToInt32(dr[0]),
                            SupplierName = Convert.ToString(dr[1]),
                            Address = Convert.ToString(dr[2]),
                            ContactNumber = Convert.ToString(dr[3])
                        });
                    }
                }
            }
            return suppliers;
        }

        public List<Supplier> GetSuppliersASC()
        {
            List<Supplier> suppliers = new List<Supplier>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetAllSuppliersASC]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        suppliers.Add(new Supplier
                        {
                            SupplierID = Convert.ToInt32(dr[0]),
                            SupplierName = Convert.ToString(dr[1]),
                            Address = Convert.ToString(dr[2]),
                            ContactNumber = Convert.ToString(dr[3])
                        });
                    }
                }
            }
            return suppliers;
        }

        public Supplier GetSupplierOnce(int id)
        {
            List<Supplier> suppliers = new List<Supplier>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSupplierOnce]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SupplierID", id);
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    adp.Fill(dt);
                    foreach (DataRow dr in dt.Rows)
                    {
                        suppliers.Add(new Supplier
                        {
                            SupplierID = Convert.ToInt32(dr[0]),
                            SupplierName = Convert.ToString(dr[1]),
                            Address = Convert.ToString(dr[2]),
                            ContactNumber = Convert.ToString(dr[3])
                        });
                    }

                    Supplier supplier = new Supplier();
                    if (suppliers.Count >= 1)
                    {
                        supplier.SupplierID = Convert.ToInt32(suppliers[0].SupplierID);
                        supplier.SupplierName = Convert.ToString(suppliers[0].SupplierName);
                        supplier.Address = Convert.ToString(suppliers[0].Address);
                        supplier.ContactNumber = Convert.ToString(suppliers[0].ContactNumber);
                    }
                    else
                    {
                        supplier.SupplierID = 0;
                        supplier.SupplierName = "";
                        supplier.Address = "";
                        supplier.ContactNumber = "";
                    }
                    return supplier;
                }
            }
        }

        public List<Supplier> SearchSuppliers(string text)
        {
            List<Supplier> suppliers = new List<Supplier>();
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_GetSearchSuppliers]", con))
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
                        suppliers.Add(new Supplier
                        {
                            SupplierID = Convert.ToInt32(dr[0]),
                            SupplierName = Convert.ToString(dr[1]),
                            Address = Convert.ToString(dr[2]),
                            ContactNumber = Convert.ToString(dr[3])
                        });
                    }
                }
            }
            return suppliers;
        }

        public bool PostSuppliers(SupplierAddDTO obj)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_CreateSupplier]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SupplierName", obj.SupplierName);
                    cmd.Parameters.AddWithValue("@Address", obj.Address);
                    cmd.Parameters.AddWithValue("@ContactNumber", obj.ContactNumber);
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

        public bool UpdateSuppliers(Supplier obj)
        {
            using (SqlConnection con = new SqlConnection(Connection))
            {
                using (SqlCommand cmd = new SqlCommand("[dbo].[sp_UpdateSupplier]", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SupplierID", obj.SupplierID);
                    cmd.Parameters.AddWithValue("@SupplierName", obj.SupplierName);
                    cmd.Parameters.AddWithValue("@Address", obj.Address);
                    cmd.Parameters.AddWithValue("@ContactNumber", obj.ContactNumber);
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
