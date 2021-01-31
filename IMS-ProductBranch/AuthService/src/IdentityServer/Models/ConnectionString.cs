

using Microsoft.Data.SqlClient;

namespace IdentityServer.Models
{
    public class ConnectionString
    {

        public static string ConnectToSqlServer()
        {
            SqlConnectionStringBuilder sqlBuilder = new SqlConnectionStringBuilder
            {
                DataSource = "ServerName",
                InitialCatalog = "DatabaseName",
                PersistSecurityInfo = true,
                IntegratedSecurity = false,
                MultipleActiveResultSets = true,

                UserID = "Username",
                Password = "Password",
            };
            //var entityConnectionStringBuilder = new EntityConnectionStringBuilder
            //{
            //    Provider = "System.Data.SqlClient",
            //    ProviderConnectionString = sqlBuilder.ConnectionString,
            //    Metadata = "res://*/Data.Database.csdl|res://*/Data.Database.ssdl|res://*/Data.Database.msl",
            //};

            //return entityConnectionStringBuilder.ConnectionString;
            return sqlBuilder.ToString();
        }
    }

   
}
