public class AppSettings
{
    public string[] AdminUsers { get; set; }
    public string[] BannedUsers { get; set; }

    public class FacebookSettings 
    {
        public string ClientId { get; set; }

        public string ClientSecret { get; set; }
    }
}