﻿using IdentityServer4.Models;
using IdentityServer4.ResponseHandling;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Quickstart
{
    public class AccountChooserResponseGenerator : AuthorizeInteractionResponseGenerator
    {
        public AccountChooserResponseGenerator(ISystemClock clock,
            ILogger<AuthorizeInteractionResponseGenerator> logger,
            IConsentService consent, IProfileService profile)
            : base(clock, logger, consent, profile)
        {
        }

        public override async Task<InteractionResponse> ProcessInteractionAsync(ValidatedAuthorizeRequest request, ConsentResponse consent = null)
        {
            {
                var response = await base.ProcessInteractionAsync(request, consent);
                if (response.IsConsent || response.IsLogin || response.IsError)
                    return response;

                //if (!request.Subject.HasClaim(c => c.Type == "TenantId" && c.Value != "0"))
                //    return new InteractionResponse
                //    {
                //        RedirectUrl = "/Company"
                //    };

                return new InteractionResponse();

            }
        }
    }
}
