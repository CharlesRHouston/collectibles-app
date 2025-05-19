namespace Collectibles.Backend.Api.Models;

public class JwtSettings
{
    public string Secret { get; init; }
    public string Issuer { get; init; }
    public string Audience { get; init; }
    public int AccessTokenExpirationMinutes { get; init; }
    public int RefreshTokenExpirationDays { get; init; }
}

public class S3Settings
{
    public string BucketName { get; set; }
    public int UrlExpirationSeconds { get; set; }
}