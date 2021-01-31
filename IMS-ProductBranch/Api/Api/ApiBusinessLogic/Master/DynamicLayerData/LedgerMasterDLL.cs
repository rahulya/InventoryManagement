using api.ApiBusinessLogic.DatabaseModel;
using api.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace api.ApiBusinessLogic.Master.DynamicLayerData
{

   
    public class LedgerMasterDLL
    {
        private readonly IConfiguration _configuration;

        public LedgerMasterDLL(IConfiguration  configuration)
        {
          this._configuration = configuration;
        }

        public string GetConnectionString()
        {
            string connString = this._configuration.GetConnectionString("IMSDbContext");
            return connString;
        }


        public ResultType GetGeneralLegerList()
        {
            ResultType result = new ResultType();
           
            string sqlQuery = @"select  ROW_NUMBER() OVER(ORDER BY gl.Gl_Desc asc) as Sno ,gl.Gl_Code,gl.Gl_Desc,gl.Gl_ShortName,gl.Gl_Category,isnull(gl.Gl_PanNo,'')Gl_PanNo,ISNULL(ag.Ac_GrpCode,'')Ac_GrpCode,ISNULL(ag.Ac_Desc,'')Ac_Desc ,
                                isnull(asg.Ac_GrpCode,'')Ac_GrpCode,isnull(asg.Ac_SGrpDesc,'')Ac_SGrpDesc,isnull(a.Agent_Code,'')Agent_Code,isnull(a.Agent_Desc,'')Agent_Desc,
                                isnull(ar.Area_Code,'')Area_Code,isnull(ar.Area_Desc,'')Area_Desc
                                from General_Ledger gl 
                                left join Account_Group ag on ag.Ac_GrpCode = gl.Ac_GrpCode
                                left join Account_Sub_Group asg on asg.Ac_SGrpCode = gl.Ac_SGrpCode
                                left join Agent a on a.Agent_Code= gl.Agent_Code
                                left join Area ar on ar.Area_Code= gl.Area_Code ";

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    conn.Open();
                    cmd.CommandTimeout = conn.ConnectionTimeout;
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = sqlQuery;
                    SqlDataReader dr = cmd.ExecuteReader();
                    List<GeneralLedger> lstObjects = new List<GeneralLedger>();
                    GeneralLedger obj = null;

                    while (dr.Read())
                    {
                        obj =new GeneralLedger();
                        obj.Sno = dr["Sno"].ToString();
                        obj.Gl_Code = dr["Gl_Code"].ToString();
                        obj.Gl_Desc = dr["Gl_Desc"].ToString();
                        obj.Gl_ShortName = dr["Gl_ShortName"].ToString();
                        obj.Gl_Category = dr["Gl_Category"].ToString();
                        obj.Gl_PanNo =dr["Gl_PanNo"].ToString();
                        obj.Ac_GrpCode = dr["Ac_GrpCode"].ToString();
                        obj.Ac_Desc = dr["Ac_Desc"].ToString();
                        obj.Ac_GrpCode = dr["Ac_GrpCode"].ToString();
                        obj.Ac_SGrpDesc = dr["Ac_SGrpDesc"].ToString();
                        obj.Agent_Code =dr["Agent_Code"].ToString();
                        obj.Agent_Desc = dr["Agent_Desc"].ToString();
                        obj.Area_Code =dr["Area_Code"].ToString();
                        obj.Area_Desc = dr["Area_Desc"].ToString();
                        lstObjects.Add(obj);
                    }
                    result.ListData = lstObjects;
                }
            }
                return result;
        }
    }
}
