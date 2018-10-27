using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.Extensions.Options;

namespace identityService
{
    public class ProfileService : IProfileService
    {
        //settings
        private readonly IOptions<AppSettings> _appSettings;

        public ProfileService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            string subject = context.Subject.Claims.ToList().Find(s => s.Type == "sub").Value;
            
            try
            {
                if (_appSettings.Value.AdminUsers.Contains(subject))
                {
                    context.IssuedClaims.Add(new Claim("name", context.Subject.Claims.ToList().Find(s => s.Type == "name").Value));
                    context.IssuedClaims.Add(new Claim("role", "admin"));
                }
                else {
                    context.IssuedClaims.Add(new Claim("name", context.Subject.Claims.ToList().Find(s => s.Type == "name").Value));
                    context.IssuedClaims.Add(new Claim("role", "user"));
                }

                return Task.FromResult(0);
            }
            catch
            {
                return Task.FromResult(0);
            }
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            string subject = context.Subject.Claims.ToList().Find(s => s.Type == "sub").Value;

            if (_appSettings.Value.BannedUsers.Contains(subject))
            {
                context.IsActive = false;
            }
            else
            {
                context.IsActive = true;
            }

            return Task.FromResult(0);
        }
    }
}