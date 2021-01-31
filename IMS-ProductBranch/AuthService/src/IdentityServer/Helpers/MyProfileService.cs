using IdentityServer.Models;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Quickstart
{
    public class MyProfileService : IProfileService
    {

        private  IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
        private  UserManager<ApplicationUser> _userManager;

        public MyProfileService(UserManager<ApplicationUser> userManager, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory)
        {
            _userManager = userManager;
            _claimsFactory = claimsFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            // Issue custom claim
            //context.IssuedClaims.Add(context.Subject.Claims.First(c => c.Type ==
            //       "TenantId"));
            var user = await _userManager.GetUserAsync(context.Subject);
            var principal = await _claimsFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();
            claims.Add(context.Subject.Claims.First(c => c.Type =="TenantId"));


            context.IssuedClaims = claims;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
            return Task.CompletedTask;
        }
    }
}
