using Collectibles.Backend.Api.Models;

namespace Collectibles.Backend.Api.Services.Interfaces;

public interface IDatabaseAccessService
{
    Task<User> GetUser(string email);
    Task<User> GetUser(Guid id);
    Task<Guid> CreateUser(SignupRequest request);
    Task UpdateUser(Guid id, UpdateUserRequest data);
    Task PutRefreshToken(RefreshToken refreshToken);
    Task<RefreshToken> GetRefreshToken(string refreshToken);
    Task<IEnumerable<Collection>> GetCollections();
    Task DeleteUser(Guid userId);
    Task DeleteAllRefreshTokens(Guid userId);
    Task<IEnumerable<UserCollectible>> GetAllUserCollectibles(Guid userId);
    Task PutUserCollectible(Guid userId, string collectibleId, PutCollectibleRequest collectible);
    Task DeleteRefreshToken(Guid userId, string token);
}