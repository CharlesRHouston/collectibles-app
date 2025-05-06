using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Collectibles.Backend.Api.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class CollectionController : ControllerBase
{
    private readonly IDatabaseAccessService _databaseAccessService;
    
    public CollectionController(IDatabaseAccessService databaseAccessService)
    {
        _databaseAccessService = databaseAccessService;
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllCollections()
    {
        try
        {
            var collections = await _databaseAccessService.GetCollections();
            
            return Ok(new Dto<IEnumerable<Collection>>()
            {
                Data = collections
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}