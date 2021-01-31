using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IRepositoryProduct<Product> _efCoreRepositoryProduct;
        private readonly IRepositoryProduct<ProductGroup> _efCoreRepositoryProductGroup;
        private readonly IRepositoryProduct<ProductSubGroup> _efCoreRepositoryProductSubGroup;
        // private readonly IMSDbContext _iMSDbContext;
        public ProductController(IRepositoryProduct<Product> efCoreRepositoryProduct, IRepositoryProduct<ProductGroup> efCoreRepositoryProductGroup, IRepositoryProduct<ProductSubGroup> efCoreRepositoryProductSubGroup)
        {
            this._efCoreRepositoryProduct = efCoreRepositoryProduct;
            this._efCoreRepositoryProductGroup = efCoreRepositoryProductGroup;
            this._efCoreRepositoryProductSubGroup = efCoreRepositoryProductSubGroup;

           /// this._iMSDbContext = iMSDbContext;
        }
        // GET: api/ Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProduct()
        
        {
            return await _efCoreRepositoryProduct.GetAll();

           // return await _efCoreRepositoryProduct.GetAllProduct();
        }

        // POST: api/ SaveProduct
        [HttpPost]
        //[HttpPost("/api/persons")]
        public async Task<IActionResult> SaveProduct([FromBody] Product product)
        {
            try
            {

                if (!ModelState.IsValid)
                {
                   return BadRequest(ModelState);
                }
                if (_efCoreRepositoryProduct != null)
                {
                    await _efCoreRepositoryProduct.Add(product);
                    // await _efCoreRepositoryProduct.SaveChangesAsync();     
                }
                return CreatedAtAction("getAllProduct", new { id = product.ProductCode }, product);
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        [HttpGet]
        [Route("GetProductGroup/{proGroDesc}")]
        public async Task<IActionResult> GetProductGroup(string proGroDesc)
        {
            try
            {
                var productGroupList = await _efCoreRepositoryProduct.getProductGroup(proGroDesc);
                if (productGroupList == null)
                {
                    return NotFound();
                }

                return Ok(productGroupList);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("GetProductSubGroup")]
        public async Task<IActionResult> GetProductSubGroup()
        {
            try
            {
                var productSubGroupList = await _efCoreRepositoryProduct.getProductSubGroup();
                if (productSubGroupList == null)
                {
                    return NotFound();
                }

                return Ok(productSubGroupList);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpPost]
        [Route("SaveProductGroup")]
        //[HttpPost("/api/persons")]
        public async Task<IActionResult> SaveProductGroup([FromBody] ProductGroup productGroup)
        {
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (_efCoreRepositoryProductGroup != null)
                {
                    await _efCoreRepositoryProductGroup.Add(productGroup);
                    // await _efCoreRepositoryProduct.SaveChangesAsync();     
                }
                return CreatedAtAction("getAllProduct", new { id = productGroup.PrGroupCode }, productGroup);
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        [HttpGet]
        [Route("GetPrSubGrpListByPrGrpCode/{id}")]
        public async Task<IActionResult> GetPrSubGrpListByPrGrpCode(int id)
        {
            try
            {
                var productSubGroupList = await _efCoreRepositoryProduct.GetPrSubGrpListByPrGrpCode(id);
                if (productSubGroupList == null)
                {
                    return NotFound();
                }

                return Ok(productSubGroupList);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("SaveProductSubGroup")]
        //[HttpPost("/api/persons")]
        public async Task<IActionResult> SaveProductSubGroup([FromBody] ProductSubGroup productsubGroup)
        {
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (_efCoreRepositoryProductGroup != null)
                {
                    await _efCoreRepositoryProductSubGroup.Add(productsubGroup);
                    // await _efCoreRepositoryProduct.SaveChangesAsync();     
                }
                return CreatedAtAction("getAllProduct", new { id = productsubGroup.PrSubGrpCode }, productsubGroup);
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        [HttpGet]
        [Route("EditProduct/{productCode}")]
        public async Task<IActionResult>EditProduct(int productCode)
        {
            try
            {
                try
                {
                    var getEditProduct = await _efCoreRepositoryProduct.EditProduct(productCode);
                    if (getEditProduct == null)
                    {
                        return NotFound();
                    }
                    return Ok(getEditProduct);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {

                throw;
            }


        }
        [HttpPut]
        [Route("UpdateProduct/{productCode}")]
        public async Task<IActionResult> UpdateProduct(int productCode, Product product)
        {
            try
            {
                if (productCode != product.ProductCode)
                {
                    return BadRequest();
                }
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (_efCoreRepositoryProduct != null)
                {
                    await _efCoreRepositoryProduct.Update(product);
                    // await _efCoreRepositoryProduct.SaveChangesAsync();     
                }
                return CreatedAtAction("UpdateProduct", new { id = product }, product);
            }
            catch (Exception ex)
            {

                throw;
            }


        }
        [HttpDelete]
        [Route("Deleteproduct/{productCode}")]
        public async Task<IActionResult> DeleteProduct(int productCode) {
            try
            {
                var productCod = await _efCoreRepositoryProduct.Delete(productCode);
                if (productCod == null)
                {
                    return NotFound();
                }

                return Ok(productCod);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}