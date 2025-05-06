namespace Collectibles.Backend.Api.Models;

public class AuthenticationRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
public class SignupRequest : AuthenticationRequest
{
    public string? Username { get; set; }
}

public class LoginRequest : AuthenticationRequest
{

}

public class RefreshRequest
{
    public string RefreshToken { get; set; }
}

public class AuthenticationResponse
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}

public class RefreshToken
{
    public Guid UserId { get; set; }
    public Guid TokenId { get; set; }
    public string Token { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? UserAgent { get; set; }
    public string? IpAddress { get; set; }
    public bool IsValid { get; set; }
}

public class LogoutRequest
{
    public string RefreshToken { get; set; }
}