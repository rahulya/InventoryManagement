using api.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class SalesModuleResponsitory<T>:IRepositorySalesModule<T>where T:class
    {

        //dependecy injecation
        private readonly IMSDbContext _context;

        public SalesModuleResponsitory(IMSDbContext context)
        {
            //inject here
            this._context = context;

        }

      
        public async Task<List<Product>> ProductAutocomplete(string PDesc = "")
        {
            if (_context !=null && PDesc =="AllProductAutocomplte")
            {
                return await _context.Set<Product>().ToListAsync();
            }
            else
            {
                return await (from m in _context.Product
                              where m.ProductDesc.Contains(PDesc) && m.Product_Lock ==null
                              select m ).ToListAsync();
            }
        }

        //public async Task<Product> getProductDetail(string Pdesc = "")
        //{
            

        //}

        public async Task<ViewModelProductDetail> ProductDetail(string PDesc = "")
        {
            if (_context != null && PDesc == "")
            {
                return await _context.Set<ViewModelProductDetail>().FirstOrDefaultAsync();
            }
            else
            {
                return await(from m in _context.Product
                             where m.ProductDesc == PDesc
                             select new ViewModelProductDetail
                             {
                                 
                                 ProductCode = m.ProductCode,
                                 ProductDesc = m.ProductDesc,
                                 Buy_Rate = m.Buy_Rate !=null  ? m.Buy_Rate : 0,
                                 Sales_Rate = m.Sales_Rate != null ? m.Sales_Rate : 0,

                             }).FirstOrDefaultAsync();
            }
        }
        public async Task<List<Sales_BillingTerm_Master>> getSalesBillingTerm(string stProductWise = "")
        {
            try
            {
                if (_context != null && stProductWise != "")
                {
                    return await (from m in _context.Sales_BillingTerm_Master
                                  where m.ST_ProductWise == stProductWise
                                  select new Sales_BillingTerm_Master
                                  {
                                      ST_Code = m.ST_Code,
                                      ST_ShortName = m.ST_ShortName,
                                      ST_Desc = m.ST_Desc,
                                      Gl_Code = m.Gl_Code,
                                      ST_Basis = m.ST_Basis,
                                      ST_ProductWise = m.ST_ProductWise,
                                      ST_Category = m.ST_Category,
                                      ST_Profibality = m.ST_Profibality,
                                      ST_Formula = m.ST_Formula,
                                      ST_Rate = m.ST_Rate,
                                      DecimalType = m.DecimalType !=null ?m.DecimalType:"",
                                      ST_SupressZero = m.ST_SupressZero,
                                      margin = m.margin,
                                      ST_Sign = m.ST_Sign,

                                  }).ToListAsync();
                }
                else
                {
                    return await _context.Set<Sales_BillingTerm_Master>().ToListAsync();
                }
            }
            catch (Exception)
            {

                throw;
            }

        }



    }
}




