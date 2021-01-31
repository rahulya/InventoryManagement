using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private readonly IGroupRepository<GroupUser> _IGroupRepository;
        public MasterController( IGroupRepository<GroupUser> groupRepository)
        {
            this._IGroupRepository = groupRepository;

            /// this._iMSDbContext = iMSDbContext;
        }

        [Route("UserList")]
        public async Task<ActionResult<IEnumerable<GroupUser>>> GetAllUser()

        {
            return await _IGroupRepository.GetAll();

            // return await _efCoreRepositoryProduct.GetAllProduct();
        }
    }
}