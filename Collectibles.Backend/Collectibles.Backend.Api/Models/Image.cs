namespace Collectibles.Backend.Api.Models;

public class GetPresignedUrlRequest
{
    public string Filename { get; set; }
}

public class GetPresignedUrlResponse
{
    public string Url { get; set; }
}