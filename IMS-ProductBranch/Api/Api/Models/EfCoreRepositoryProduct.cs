using api.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public  class EfCoreRepositoryProduct<T>:IRepositoryProduct<T> where T :class
       
    {
        private readonly IMSDbContext _context;

        public EfCoreRepositoryProduct(IMSDbContext context)
        {
            this._context = context;
        }
        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();

           
        }
        public async Task<T> Add(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> Delete(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> Get(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

       

        public async Task<T> Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> SaveAsync(T entity)
        {
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<List<ProductGroup>> getProductGroup(string proGroDesc)
        {
            if (_context != null && proGroDesc =="AllProductGroup")
            {

               return await _context.Set<ProductGroup>().ToListAsync();  
            }
            else
            {
                return await (from m in _context.ProductGroup
                              where m.PrGrpDesc.Contains(proGroDesc)
                              select m).ToListAsync();
            }

           // return null;
        }
        public async Task<List<ProductSubGroup>> getProductSubGroup()
        {
            if (_context != null)
            {
                return await _context.Set<ProductSubGroup>().ToListAsync();
            }

            return null;
        }

        public async Task<List<ProductSubGroup>> GetPrSubGrpListByPrGrpCode(int prGrpCode)
        {
            try
            {
                if (_context != null)
                {
                   
                    return  await _context.ProductSubGroup.Where(x => x.PrGroupCode == prGrpCode).ToListAsync();
                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ViewModelProduct> EditProduct(int ProductCode)
        {
           
            if (_context != null)
            {
                return await(from p in _context.Product
                             
                             join pg in _context.ProductGroup on p.PrGroupCode equals pg.PrGroupCode
                             join psg in _context.ProductSubGroup on p.PrtSubGrpCode equals psg.PrSubGrpCode into subproduct
                             from sp in subproduct.DefaultIfEmpty()
                             
                             where p.ProductCode == ProductCode

                             select new ViewModelProduct
                             {
                                 ProductCode=p.ProductCode,
                                 ProductDesc=p.ProductDesc,
                                 UniqueName=p.UniqueName,
                                 ProductType=p.ProductType,
                                 Unit = p.Unit,
                                 Factor = p.Factor,
                                 ValuationType =p.ValuationType,
                                 AltUnit = p.AltUnit,
                                 Conv_Ratio = p.Conv_Ratio,
                                 Buy_Rate = p.Buy_Rate,
                                 Sales_Rate = p.Sales_Rate,
                                 Max_Stock = p.Max_Stock,
                                 Min_Stock = p.Min_Stock,
                                 Reorder_Level = p.Reorder_Level,
                                 Reorder_Qty = p.Reorder_Qty,
                                 Product_Rate = p.Product_Rate,
                                 Product_MRP = p.Product_MRP,
                                 Trade_Price = p.Trade_Price,
                                 Min_Qty = p.Min_Qty,                                                             
                                 AddProductDescription = p.AddProductDescription,
                                 Warranty_Period = p.Warranty_Period,                              
                                 PrtSubGrpCode=p.PrtSubGrpCode,
                                 ////////product group
                                 PrGrpDesc=pg.PrGrpDesc,
                                 PrGroupCode = p.PrGroupCode,
                                 ///product sub product
                                 PrSubGrpDesc = sp.PrSubGrpDesc == null ? "" : sp.PrSubGrpDesc,
                                 PrSubGrpCode=sp.PrSubGrpCode == 0 ?0 : sp.PrSubGrpCode

                             }).FirstOrDefaultAsync();


            }
            return null;
        }

        //Task<T> IRepositoryProduct<T>.EditProduct(int ProductCode)
        //{
        //    throw new NotImplementedException();
        //}

        //Task<List<T>> IRepositoryProduct<T>.getProductGroup()
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task<List<ViewModelProduct>> GetAllProduct()
        //{
        //    if (_context != null) { 
        //        return await(from p in _context.Product
        //                 select new ViewModelProduct
        //                 {
        //                     ProductCode = p.ProductCode,
        //                     ProductDesc = p.ProductDesc,
        //                     UniqueName = p.UniqueName,
        //                     ProductType = p.ProductType,
        //                     PrGroupCode = p.PrGroupCode,
        //                     PrtSubGrpCode = p.PrtSubGrpCode,
        //                     PrGroupCode1 = p.PrGroupCode1

        //                 }).ToListAsync();

        //    }
        //    return null;

        //}
    }
}
