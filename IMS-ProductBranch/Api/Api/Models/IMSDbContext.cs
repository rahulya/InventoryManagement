using api.ApiBusinessLogic.DatabaseModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class IMSDbContext : DbContext
    {
        public IMSDbContext(DbContextOptions<IMSDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductGroup)
                .WithMany(b => b.Products)              
                .HasForeignKey(p => p.PrGroupCode);

            modelBuilder.Entity<Product>()
               .HasOne(p => p.ProductSubGroup)
               .WithMany(b => b.Products)
               .HasForeignKey(p => p.PrtSubGrpCode);

            //modelBuilder.Entity<Sales_BillingTerm_Master>()
            // .HasOne(p => p.ST_Desc);
             
        }

        public DbSet<Product> Product { get; set; }

        public DbSet<ProductGroup>ProductGroup { get; set; }
        public DbSet<ProductSubGroup> ProductSubGroup { get; set; }

        public DbSet<Sales_BillingTerm_Master> Sales_BillingTerm_Master { get; set; }
        public DbSet<GeneralLedger> GeneralLedger { get; set; }
        public DbSet<GroupUser> Groups { get; set; }


    }
}
