using Amazon.S3;
using Amazon.S3.Model;
using Collectibles.Backend.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Collectibles.Backend.Api.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class ImageController : ControllerBase
{
    private readonly S3Settings _settings;
    private readonly AmazonS3Client _client;
    
    public ImageController(IOptions<S3Settings> settings, AmazonS3Client client)
    {
        _settings = settings.Value;
        _client = client;
    }
    
    [HttpPost("upload")]
    [Authorize]
    public async Task<IActionResult> GetPresignedUrlForUpload([FromBody] Dto<GetPresignedUrlRequest> request)
    {
        if (string.IsNullOrWhiteSpace(request?.Data?.Filename))
        {
            return BadRequest("Filename must be provided.");
        }
        
        try
        {
            var url = await _client.GetPreSignedURLAsync(new GetPreSignedUrlRequest
            {
                BucketName = _settings.BucketName,
                Key = request.Data.Filename,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddSeconds(_settings.UrlExpirationSeconds),
                ContentType = "image/jpeg",
            });
        
            return Ok(new Dto<GetPresignedUrlResponse>()
            {
                Data = new GetPresignedUrlResponse()
                {
                    Url = url
                }
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("download")]
    [Authorize]
    public async Task<IActionResult> GetPresignedUrlForDownload([FromBody] Dto<GetPresignedUrlRequest> request)
    {
        if (string.IsNullOrWhiteSpace(request?.Data?.Filename))
        {
            return BadRequest("Filename must be provided.");
        }
        
        try
        {
            var url = await _client.GetPreSignedURLAsync(new GetPreSignedUrlRequest
            {
                BucketName = _settings.BucketName,
                Key = request.Data.Filename,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddSeconds(_settings.UrlExpirationSeconds),
                ContentType = "image/jpeg"
            });

            return Ok(new Dto<GetPresignedUrlResponse>
            {
                Data = new GetPresignedUrlResponse
                {
                    Url = url
                }
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500, ex.Message);
        }
    }
}