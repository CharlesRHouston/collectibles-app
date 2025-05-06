using System.Globalization;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Collectibles.Backend.Api.Controllers;
using Collectibles.Backend.Api.Exceptions;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;

namespace Collectibles.Backend.Api.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly AmazonDynamoDBClient _client;
    private readonly IPasswordService _passwordService;

    public AuthenticationService(AmazonDynamoDBClient client, IPasswordService passwordService)
    {
        _client = client;
        _passwordService = passwordService;
    }

    public async Task ValidateEmailUnique(string email)
    {
        var query = new QueryRequest
        {
            TableName = "User",
            IndexName = "EmailIndex",
            KeyConditionExpression = "email = :v_email",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                { ":v_email", new AttributeValue { S = email } }
            }
        };
            
        var response = await _client.QueryAsync(query);

        if (response.Count > 0)
        {
            throw new EmailAlreadyExistsException(email);
        }
    }

    public void ValidateEmailAndPasswordNotNull(AuthenticationRequest request)
    {
        if (request.Email == null || request.Password == null)
        {
            throw new ArgumentException("Email and password are required.");
        }
    }
}