using api.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public interface IRepositorySalesModule<T>where T :class
    {

        Task<List<Product>> ProductAutocomplete(string PDesc = "");

        Task <ViewModelProductDetail> ProductDetail(string PDesc = "");

        Task <List<Sales_BillingTerm_Master>> getSalesBillingTerm(string stProductWise = "");

    }
}
