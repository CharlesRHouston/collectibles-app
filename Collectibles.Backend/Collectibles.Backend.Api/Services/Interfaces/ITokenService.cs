using Collectibles.Backend.Api.Models;

namespace Collectibles.Backend.Api.Services.Interfaces;

public interface ITokenService
{
    string CreateAccessToken(Guid userId);
    RefreshToken CreateRefreshToken(Guid userId);
    RefreshToken CreateRefreshToken(Guid userId, Guid tokenId);
}