using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Amazon;
using Amazon.DynamoDBv2.Model;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Collectibles.Backend.Api.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class UserController : ControllerBase
{
    private readonly IDatabaseAccessService _databaseAccessService;
    
    public UserController(IDatabaseAccessService databaseAccessService)
    {
        _databaseAccessService = databaseAccessService;
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUser()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (userId == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var user = await _databaseAccessService.GetUser(Guid.Parse(userId));
            
            return Ok(new Dto<GetUserResponse>()
            {
                Data = new GetUserResponse
                {
                    Id = user.Id, 
                    Email = user.Email, 
                    Username = user.Username
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPatch]
    [Authorize]
    public async Task<IActionResult> UpdateUser([FromBody] Dto<UpdateUserRequest> request)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (userId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            
            await _databaseAccessService.UpdateUser(Guid.Parse(userId), request.Data);
            
            return Accepted();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeleteUser()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (userId == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            
            await _databaseAccessService.DeleteUser(Guid.Parse(userId));
            await _databaseAccessService.DeleteAllRefreshTokens(Guid.Parse(userId));
            //TODO: delete collectibles
            
            return Accepted();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}