using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace identityService
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // for MVC UI
            services.AddMvc();

            // add IdentityServer service
            services.AddIdentityServer()
                    .AddSigningCredential(Config.GetSigningCertificate())
                    // add resources
                    .AddInMemoryIdentityResources(Config.GetIdentityResources())
                    .AddInMemoryApiResources(Config.GetApiResources())
                    // add clients
                    .AddInMemoryClients(Config.GetClients())
                    // temporal in-memory users
                    .AddTestUsers(Config.GetUsers());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // add IdentityServer to the pipeline
            app.UseIdentityServer();

            // for MVC UI
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
