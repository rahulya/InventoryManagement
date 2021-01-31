using api.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public interface IRepositoryProduct<T>where T :class
    {

        Task<List<T>> GetAll();
       // Task<List<ViewModelProduct>> GetAllProduct();
        Task<T> Get(int id);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
        Task<T> SaveAsync(T entity);    
        Task<List<ProductGroup>> getProductGroup(string prGrpDesc="");
        Task<List<ProductSubGroup>> getProductSubGroup();
        Task<List<ProductSubGroup>> GetPrSubGrpListByPrGrpCode(int prGrpCode);

        Task<ViewModelProduct> EditProduct(int ProductCode);
    }
}
