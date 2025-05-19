using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Collectibles.Backend.Api.Services;

internal class TokenService : ITokenService
{
    private readonly JwtSettings _settings;

    public TokenService(IOptions<JwtSettings> settings)
    {
        _settings = settings.Value;
    }

    public string CreateAccessToken(Guid userId)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: new List<Claim>()
            {
                new(JwtRegisteredClaimNames.Sub, userId.ToString()),
            },
            expires: DateTime.Now.AddMinutes(_settings.AccessTokenExpirationMinutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public RefreshToken CreateRefreshToken(Guid userId)
    {
        return new RefreshToken()
        {
            UserId = userId,
            TokenId = Guid.NewGuid(),
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32)),
            ExpiresAt = DateTime.Now.AddDays(_settings.RefreshTokenExpirationDays),
            CreatedAt = DateTime.Now,
            IsValid = true
        };
    }
    
    public RefreshToken CreateRefreshToken(Guid userId, Guid tokenId)
    {
        return new RefreshToken()
        {
            UserId = userId,
            TokenId = tokenId,
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32)),
            ExpiresAt = DateTime.Now.AddDays(_settings.RefreshTokenExpirationDays),
            CreatedAt = DateTime.Now,
            IsValid = true
        };
    }
}