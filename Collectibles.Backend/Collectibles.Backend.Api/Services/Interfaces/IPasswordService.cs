namespace Collectibles.Backend.Api.Services.Interfaces;

public interface IPasswordService
{
    bool VerifyPassword(string password, string passwordHash);
    string HashPassword(string password);
    string HashToken(string token);
    bool VerifyToken(string token, string tokenHash);
}