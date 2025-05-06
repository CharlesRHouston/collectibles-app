using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace Collectibles.Backend.Api.Services;

public class PasswordService : IPasswordService
{
    private readonly JwtSettings _settings;
    
    public PasswordService(IOptions<JwtSettings> settings)
    {
        _settings = settings.Value;
    }
    
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
    }

    public bool VerifyPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.EnhancedVerify(password, passwordHash);
    }

    public string HashToken(string token)
    {
        using var sha256 = SHA256.Create();
        var tokenBytes = Encoding.UTF8.GetBytes(token);
        var hashBytes = sha256.ComputeHash(tokenBytes);
        return Convert.ToBase64String(hashBytes);
    }

    public bool VerifyToken(string token, string tokenHash)
    {
        var hashedInputToken = HashToken(token);
        return hashedInputToken == tokenHash;
    }
}