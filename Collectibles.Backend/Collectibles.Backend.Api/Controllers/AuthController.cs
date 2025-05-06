using System.Security.Claims;
using Collectibles.Backend.Api.Exceptions;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Collectibles.Backend.Api.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly IAuthenticationService _authenticationService;
    private readonly IPasswordService _passwordService;
    private readonly IDatabaseAccessService _databaseAccessService;

    public AuthController(
        ITokenService tokenService, 
        IAuthenticationService authenticationService, 
        IPasswordService passwordService, IDatabaseAccessService databaseAccessService)
    {
        _tokenService = tokenService;
        _authenticationService = authenticationService;
        _passwordService = passwordService;
        _databaseAccessService = databaseAccessService;
    }
    
    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] Dto<SignupRequest> request)
    {
        try
        {
            _authenticationService.ValidateEmailAndPasswordNotNull(request.Data);
            await _authenticationService.ValidateEmailUnique(request.Data.Email);

            var userId = await _databaseAccessService.CreateUser(request.Data);

            var refreshToken = _tokenService.CreateRefreshToken(userId);
            await _databaseAccessService.PutRefreshToken(refreshToken);
            
            return Accepted(
                new Dto<AuthenticationResponse>()
                {
                    Data = new AuthenticationResponse()
                    {
                        AccessToken = _tokenService.CreateAccessToken(userId),
                        RefreshToken = refreshToken.Token
                    }
                }
            );
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine(ex.Message);
            return BadRequest(ex.Message);
        }
        catch (EmailAlreadyExistsException ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(409, ex.Message);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Dto<LoginRequest> request)
    {
        try
        {
            _authenticationService.ValidateEmailAndPasswordNotNull(request.Data);
            
            var user = await _databaseAccessService.GetUser(request.Data.Email);
            
            var isValidLogin = _passwordService.VerifyPassword(request.Data.Password, user.Password);

            if (!isValidLogin)
            {
                return Unauthorized("Password is incorrect.");
            }

            var refreshToken = _tokenService.CreateRefreshToken(user.Id);
            await _databaseAccessService.PutRefreshToken(refreshToken);
            
            return Ok(
                new Dto<AuthenticationResponse>()
                {
                    Data = new AuthenticationResponse()
                    {
                        AccessToken = _tokenService.CreateAccessToken(user.Id),
                        RefreshToken = refreshToken.Token
                    }
                }
            );
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] Dto<RefreshRequest> request)
    {
        try
        {
            var existingRefreshToken = await _databaseAccessService.GetRefreshToken(request.Data.RefreshToken);
            var isValid = _passwordService.VerifyToken(request.Data.RefreshToken, existingRefreshToken.Token);

            if (!isValid || existingRefreshToken.ExpiresAt < DateTime.UtcNow)
            {
                return Unauthorized("Refresh token is not valid.");
            }
            
            // Will replace existing refresh token (same partition (user ID) and sort key (token ID))
            var newRefreshToken = _tokenService.CreateRefreshToken(existingRefreshToken.UserId, existingRefreshToken.TokenId);
            await _databaseAccessService.PutRefreshToken(newRefreshToken);

            return Ok(
                new Dto<AuthenticationResponse>()
                {
                    Data = new AuthenticationResponse()
                    {
                        AccessToken = _tokenService.CreateAccessToken(existingRefreshToken.UserId),
                        RefreshToken = newRefreshToken.Token
                    }
                }
            );
        }
        catch (RefreshTokenLookupException ex)
        {
            return Unauthorized(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout([FromBody] Dto<LogoutRequest> request)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            await _databaseAccessService.DeleteRefreshToken(Guid.Parse(userId), request.Data.RefreshToken);

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}