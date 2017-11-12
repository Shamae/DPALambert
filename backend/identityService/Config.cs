using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace identityService
{
    public class Config
    {
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            // for identity token
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            // for resource token
            return new List<ApiResource>
            {
                new ApiResource("tileApi", "Tile Servier API"),
                new ApiResource("menuApi", "Menu Service API"),
                new ApiResource("itemApi", "Item Service API")
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                // client credentials client
                new Client
                {
                    ClientId = "worldMapClient",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    ClientSecrets = 
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = { "tileApi", "menuApi", "itemApi" }
                },

                // OpenID Connect implicit flow client (MVC)
                new Client
                {
                    ClientId = "worldMapUserClient",
                    ClientName = "World Map User Client",
                    AllowedGrantTypes = GrantTypes.Implicit,

                    // where to redirect to after login
                    RedirectUris = { "http://localhost:5002/signin-oidc" },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { "http://localhost:5002/signout-callback-oidc" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "tileApi",
                        "menuApi",
                        "itemApi"
                    }
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
                        new Claim("website", "https://alice.com")
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
                        new Claim("website", "https://bob.com")
                    }
                }
            };
        }
    }
}