using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DataBase_Connect
    {
        protected string strCon = @"Data Source = DESKTOP-UHPB8VT;
                                    Initial Catalog = QUANLYDATLICH;
                                    Integrated Security = True;
                                    TrustServerCertificate = True;";

        SqlDataAdapter sqlAdap;
        DataTable dt;
        SqlCommand cmd;

        //phi kết nối
        /// <summary>
        /// phương thức 1: phương thức trả về một datatable: dùng để hiển thị dữ liệu lên DataGridView 
        /// và kiểm tra trùng mã
        /// </summary>
        /// <param name="strSelect">Chuỗi string mô tả câu lệnh Select</param>
        /// <returns></returns>             
        public DataTable GetDataTable(string strSelect)
        {
            //B1
            sqlAdap = new SqlDataAdapter(strSelect, strCon);
            dt = new DataTable();
            //B2
            sqlAdap.Fill(dt);
            //B3
            return dt;
        }
        
    }
}
