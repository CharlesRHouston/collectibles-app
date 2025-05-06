using System.Security.Claims;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Collectibles.Backend.Api.Controllers;

[ApiController]
[Route("/api/v1/user/[controller]")]
public class CollectibleController : ControllerBase
{
    private readonly IDatabaseAccessService _databaseAccessService;
    
    public CollectibleController(IDatabaseAccessService databaseAccessService)
    {
        _databaseAccessService = databaseAccessService;
    }

    [HttpGet("all")]
    [Authorize]
    public async Task<IActionResult> GetAllUserCollectibles()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (userId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            
            var collectibles = await _databaseAccessService.GetAllUserCollectibles(Guid.Parse(userId));
            
            return Ok(new Dto<IEnumerable<UserCollectible>>()
            {
                Data = collectibles
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    
    [HttpPut("{collectibleId}")]
    [Authorize]
    public async Task<IActionResult> PutCollectible(string collectibleId, [FromBody] Dto<PutCollectibleRequest> collectible)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (userId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            
            await _databaseAccessService.PutUserCollectible(Guid.Parse(userId), collectibleId, collectible.Data);
            
            return Accepted();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}