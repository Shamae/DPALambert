using IdentityServer4.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace identityService
{
    public class Startup
    {
        // declare configuration root
        public IConfigurationRoot Configuration { get; set; }

        // configure builder to include appsettings.json
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // configure CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                    );
            });

            // for MVC UI
            services.AddMvc();

            // get settings from appsettings.json
            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            // add IdentityServer service
            services.AddIdentityServer()
                    .AddSigningCredential(Config.GetSigningCertificate())
                    // add resources
                    .AddInMemoryIdentityResources(Config.GetIdentityResources())
                    .AddInMemoryApiResources(Config.GetApiResources())
                    // add clients
                    .AddInMemoryClients(Config.GetClients())
                    .AddProfileService<ProfileService>();
                    // temporal in-memory users
                    //.AddTestUsers(Config.GetUsers());

            // add Facebook login
            services.AddAuthentication().AddFacebook("Facebook", options =>
            {
                options.SignInScheme = IdentityServer4.IdentityServerConstants.ExternalCookieAuthenticationScheme;

                options.ClientId = Configuration.GetSection("AppSettings").GetSection("FacebookSettings").GetValue<string>("ClientId");
                options.ClientSecret = Configuration.GetSection("AppSettings").GetSection("FacebookSettings").GetValue<string>("ClientSecret");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // use CORS
            app.UseCors("AllowAll");

            // add IdentityServer to the pipeline
            app.UseIdentityServer();

            // for MVC UI
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
