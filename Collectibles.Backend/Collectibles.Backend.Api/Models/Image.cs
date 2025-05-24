namespace Collectibles.Backend.Api.Models;

public class GetPresignedUrlRequest
{
    public string CollectibleId { get; set; }
}

public class GetPresignedUrlResponse
{
    public string Url { get; set; }
}