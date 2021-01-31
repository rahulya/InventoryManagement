using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.ApiBusinessLogic.Master.BusinessLayerData;
using api.ApiBusinessLogic.Master.DynamicLayerData;

using api.Models;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Api
{
    public class Startup
    {
        private IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        [Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContextPool<IMSDbContext>(options => options.UseSqlServer(_configuration.GetConnectionString("IMSDbContext")));
            services.AddScoped(typeof(IRepositoryProduct<>), typeof(EfCoreRepositoryProduct<>));
            services.AddScoped(typeof(IRepositorySalesModule<>), typeof(SalesModuleResponsitory<>));
            services.AddScoped(typeof(IGroupRepository<>), typeof(SqlGroupRepository<>));


            services.AddScoped(typeof(LedgerMasterDLL), typeof(LedgerMasterDLL));
           



            services.AddControllers();

            

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:44347", "https://localhost:44347", "https://localhost:4200",
                                        "http://localhost:4200", "http://localhost:4500", "https://localhost:4500").AllowAnyMethod().AllowAnyHeader();
                    builder.WithHeaders("Authorization");
                    builder.WithHeaders("content-type");

                });
            });

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //  .AddJwtBearer(options =>
            //  {
            //        // base-address of your identityserver
            //        options.Authority = "http://localhost:5000";

            //        // name of the API resource
            //        options.Audience = "ims_api";
            //  });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(MyAllowSpecificOrigins);


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{api}/{controller=Home}/{action=Index}/{id?}");
            });

            app.UseAuthentication();


        }
    }
}
