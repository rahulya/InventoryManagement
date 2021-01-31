using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesModuleController : ControllerBase
    {
        private readonly IRepositorySalesModule<Product> _repositorySalesModule;
        private readonly IRepositorySalesModule<Sales_BillingTerm_Master> _repositorySalesModuleBillingTerm;


        public SalesModuleController(
            IRepositorySalesModule<Product> repositorySalesModule,
           IRepositorySalesModule<Sales_BillingTerm_Master> repositorySalesModuleBillingTerm )
        {
            this._repositorySalesModule = repositorySalesModule;
          this._repositorySalesModuleBillingTerm = repositorySalesModuleBillingTerm;
        }

        [HttpGet]
        [Route("getProductListAutocomplete/{pDesc}")]
        public  async Task<IActionResult> getProductAutocomplete(string pDesc="")
        {
            try
            {
                var productListAuto = await _repositorySalesModule.ProductAutocomplete(pDesc);

                if (productListAuto==null)
                {
                    return NotFound();
                }
                return Ok(productListAuto);

            }
             
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
        [HttpGet]
        [Route("getProductDetail/{PDesc}")]
        public async Task<IActionResult>getProductDetail(string PDesc = "")
        {

            try
            {
                var productdetaill = await _repositorySalesModule.ProductDetail(PDesc);
                if (productdetaill == null)
                {
                    return NotFound();
                }
                return Ok(productdetaill);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("getSalesBillingTerm/{stProductWise}")]
        public async Task<IActionResult> getSalesBillingTerm(string stProductWise = "")
        {

            try
            {
                var SalesBillingTerm = await _repositorySalesModuleBillingTerm.getSalesBillingTerm(stProductWise);
                if (SalesBillingTerm == null)
                {
                    return NotFound();
                }
                return Ok(SalesBillingTerm);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }
}

