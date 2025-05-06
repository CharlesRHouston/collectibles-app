using Collectibles.Backend.Api.Models;

namespace Collectibles.Backend.Api.Services.Interfaces;

public interface IAuthenticationService
{
    Task ValidateEmailUnique(string email);
    void ValidateEmailAndPasswordNotNull(AuthenticationRequest request);
}