using System.Text.Json.Serialization;

namespace Collectibles.Backend.Api.Models;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class UpdateUserRequest
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public class GetUserResponse
{
    public Guid Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
}

