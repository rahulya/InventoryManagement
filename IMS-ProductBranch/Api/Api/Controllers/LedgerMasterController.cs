using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.ApiBusinessLogic.DatabaseModel;
using api.ApiBusinessLogic.Master.BusinessLayerData;
using api.ApiBusinessLogic.Master.DynamicLayerData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LedgerMasterController : ControllerBase
    {

         private readonly  LedgerMasterDLL Dll;

        public LedgerMasterController( LedgerMasterDLL _Dll)
        {
            Dll = _Dll;
        }
     
        [HttpGet]
        [Route("getGeneralLegerList")]
        public IActionResult GetGeneralLegerList()
        {          
            try
            {
                ResultType result = new ResultType();
                result = Dll.GetGeneralLegerList();
                return Ok(result.ListData);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}