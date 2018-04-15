using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;
using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;

namespace identityService
{
    public class Config
    {
        // get the signing certificate
        internal static X509Certificate2 GetSigningCertificate()
        {
            var fileName = Path.Combine(Path.GetDirectoryName(Directory.GetCurrentDirectory()), "identityService/cert.pfx");
            var info = new DirectoryInfo(Path.GetDirectoryName(Directory.GetCurrentDirectory())).GetFiles();
            if(!File.Exists(fileName)) {
                throw new FileNotFoundException("Signing Certificate is missing!");
            }
            var cert = new X509Certificate2(fileName);
            return cert;
        }

        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            // for identity token
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource {
                    Name = "role",
                    UserClaims = new List<string> {"role"}
                }
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            // for resource token
            return new List<ApiResource>
            {
                new ApiResource("tileApi", "Tile Service API"),
                new ApiResource("menuApi", "Menu Service API"),
                new ApiResource
                {
                    Name = "itemApi",
                    DisplayName = "Item Service API",
                    Description = "Item Service API Access",

                    // secret for using introspection endpoint
                    ApiSecrets = {
                        new Secret("itemsecret".Sha256())
                    },

                    // include the following using claims in access token (in addition to subject id)
                    UserClaims = {"role"},

                    // defining scopes
                    Scopes = {
                        new Scope()
                        {
                            Name = "itemApi.admin_access",
                            DisplayName = "Full admin access to itemApi"
                        },
                        new Scope
                        {
                            Name = "itemApi.standard_access",
                            DisplayName = "Standard user access to itemApi"
                        }
                    }
                }
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client list
            return new List<Client>
            {
                // OpenID Connect implicit flow standard user client
                new Client
                {
                    ClientId = "worldMapUserClient",
                    ClientName = "World Map User Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    // only reference token
                    AccessTokenType = AccessTokenType.Jwt,

                    // where to redirect to after login
                    RedirectUris = { 
                        "http://localhost:8080/callback.html",
                        "http://localhost:8080/popup.html",
                        "http://localhost:8080/index.html"
                        },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { 
                        "http://localhost:8080/index.html" 
                        },

                    // CORS origins TODO
                    // AllowedCorsOrigins = { "http://localhost:8080" },

                    // set scopes that are allowed for this client
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "role",
                        "tileApi",
                        "menuApi",
                        "itemApi.standard_access"
                        },

                    // Consent
                    RequireConsent = false
                },

                // OpenID Connect implicit flow admin user client
                new Client
                {
                    ClientId = "worldMapAdminClient",
                    ClientName = "World Map Admin Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    // only reference token
                    AccessTokenType = AccessTokenType.Jwt,

                    // where to redirect to after login
                    RedirectUris = { 
                        "http://localhost:8080/callback.html",
                        "http://localhost:8080/popup.html",
                        "http://localhost:8080/index.html"
                        },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { 
                        "http://localhost:8080/index.html" 
                        },

                    // CORS origins TODO
                    // AllowedCorsOrigins = { "http://localhost:8080" },

                    // set scopes that are allowed for this client
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "role",
                        "tileApi",
                        "menuApi",
                        "itemApi.admin_access"
                        },

                    // Consent
                    RequireConsent = false
                }
            };
        }

        // list of in-memory users (will be deleted)
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password",

                    Claims = new List<Claim>
                    {
                        new Claim("name", "Alice"),
                        new Claim("role", "user"),
                        new Claim("role", "admin")
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password",

                    Claims = new List<Claim>
                    {
                        new Claim("name", "Bob"),
                        new Claim("role", "user")
                    }
                }
            };
        }
    }
}