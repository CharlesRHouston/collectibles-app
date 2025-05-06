using System.Globalization;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Collectibles.Backend.Api.Exceptions;
using Collectibles.Backend.Api.Helpers;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services.Interfaces;

namespace Collectibles.Backend.Api.Services;

public class DatabaseAccessService : IDatabaseAccessService
{
    private readonly AmazonDynamoDBClient _client;
    private readonly IPasswordService _passwordService;

    public DatabaseAccessService(AmazonDynamoDBClient client, IPasswordService passwordService)
    {
        _client = client;
        _passwordService = passwordService;
    }

    public async Task<Guid> CreateUser(SignupRequest request)
    {
        var userId = Guid.NewGuid();
        
        await _client.PutItemAsync(new PutItemRequest()
        {
            TableName = "User",
            Item = new Dictionary<string, AttributeValue>()
            {
                { "id", new AttributeValue() { S = userId.ToString() } },
                { "email", new AttributeValue { S = request.Email } },
                { "password", new AttributeValue { S = _passwordService.HashPassword(request.Password) } },
                { "username", new AttributeValue { S = request?.Username ?? "User" } }
            }
        });
        
        return userId;
    }

    public async Task<User> GetUser(string email)
    {
        var response = await _client.QueryAsync(new QueryRequest
        {
            TableName = "User",
            IndexName = "EmailIndex",
            KeyConditionExpression = "email = :v_email",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                { ":v_email", new AttributeValue { S = email } }
            }
        });

        if (response.Items.Count == 0)
        {
            throw new UserLookupException($"No matching email identified for {email}.");
        }
        
        if (response.Items.Count > 1)
        {
            throw new UserLookupException($"{response.Items.Count} matching emails identified for {email}.");
        }
        
        return new User()
        {
            Id = Guid.Parse(response.Items[0]["id"].S),
            Username = response.Items[0]["username"].S,
            Email = response.Items[0]["email"].S,
            Password = response.Items[0]["password"].S
        };
    }

    public async Task<User> GetUser(Guid id)
    {
        var response = await _client.QueryAsync(new QueryRequest
        {
            TableName = "User",
            KeyConditionExpression = "id = :v_id",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                { ":v_id", new AttributeValue { S = id.ToString() } }
            }
        });

        if (response.Items.Count == 0 || response.Items.Count > 1)
        {
            throw new UserLookupException($"No matching user with ID {id} identified.");
        }
        
        return new User()
        {
            Id = Guid.Parse(response.Items[0]["id"].S),
            Username = response.Items[0]["username"].S,
            Email = response.Items[0]["email"].S,
            Password = response.Items[0]["password"].S
        };
    }

    public async Task UpdateUser(Guid userId, UpdateUserRequest data)
    {
        var updates = new Dictionary<string, AttributeValueUpdate>();
        
        UserHelper.AddToUpdatesIfNotNull(updates, "username", data.Username);
        UserHelper.AddToUpdatesIfNotNull(updates, "email", data.Email);
        UserHelper.AddToUpdatesIfNotNull(updates, "password", data.Password, _passwordService.HashPassword);
        
        await _client.UpdateItemAsync(new UpdateItemRequest()
        {
            TableName = "User",
            AttributeUpdates = updates,
            Key = new Dictionary<string, AttributeValue>
            {
                ["id"] = new() { S = userId.ToString() },
            }
        });
    }

    public async Task DeleteUser(Guid userId)
    {
        await _client.DeleteItemAsync(new DeleteItemRequest()
        {
            TableName = "User",
            Key = new Dictionary<string, AttributeValue>()
            {
                { "id", new AttributeValue { S = userId.ToString() } }
            }
        });
    }

    public async Task<RefreshToken> GetRefreshToken(string refreshToken)
    {
        var response = await _client.QueryAsync(new QueryRequest
        {
            TableName = "Refresh",
            IndexName = "TokenIndex",
            KeyConditionExpression = "#t = :v_token",
            ExpressionAttributeNames = new Dictionary<string, string>
            {
                { "#t", "token" }
            },
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                { ":v_token", new AttributeValue { S = _passwordService.HashToken(refreshToken) } }
            }
        });
        
        if (response?.Items.Count != 1)
        {
            throw new RefreshTokenLookupException("Unable to retrieve refresh token.");
        }

        return new RefreshToken()
        {
            UserId = Guid.Parse(response.Items[0]["userId"].S),
            TokenId = Guid.Parse(response.Items[0]["tokenId"].S),
            Token = response.Items[0]["token"].S,
            ExpiresAt = Convert.ToDateTime(response.Items[0]["expiresAt"]?.S),
            CreatedAt = Convert.ToDateTime(response.Items[0]["createdAt"]?.S),
            IsValid = Convert.ToBoolean(response.Items[0]["isValid"]?.S)
        };
    }

    public async Task PutRefreshToken(RefreshToken refreshToken)
    {
        await _client.PutItemAsync(new PutItemRequest()
        {
            TableName = "Refresh",
            Item = new Dictionary<string, AttributeValue>()
            {
                { "userId", new AttributeValue() { S = refreshToken.UserId.ToString() } },
                { "tokenId", new AttributeValue() { S = refreshToken.TokenId.ToString() } },
                { "token", new AttributeValue { S = _passwordService.HashToken(refreshToken.Token) } },
                { "expiresAt", new AttributeValue { S = refreshToken.ExpiresAt.ToString(CultureInfo.InvariantCulture) } },
                { "createdAt", new AttributeValue { S = refreshToken.CreatedAt.ToString(CultureInfo.InvariantCulture) } },
                { "isValid", new AttributeValue { S = refreshToken.IsValid.ToString() } }
            }
        });
    }

    private async Task DeleteRefreshToken(Guid userId, Guid tokenId)
    {
        await _client.DeleteItemAsync(new DeleteItemRequest()
        {
            TableName = "Refresh",
            Key = new Dictionary<string, AttributeValue>()
            {
                { "userId", new AttributeValue { S = userId.ToString() } },
                { "tokenId", new AttributeValue { S = tokenId.ToString() } },
            }
        });
    }

    public async Task DeleteRefreshToken(Guid userId, string token)
    {
        var refreshToken = await GetRefreshToken(token);
        await DeleteRefreshToken(userId, refreshToken.TokenId);
    }

    public async Task DeleteAllRefreshTokens(Guid userId)
    {
        var response = await GetAllRefreshTokens(userId);

        foreach (var item in response.Items)
        {
            var tokenId = item["tokenId"].S;

            await DeleteRefreshToken(userId, Guid.Parse(tokenId));
        }
    }

    private async Task<QueryResponse> GetAllRefreshTokens(Guid userId)
    {
        return await _client.QueryAsync(new QueryRequest
        {
            TableName = "Refresh",
            KeyConditionExpression = "userId = :userId",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                { ":userId", new AttributeValue { S = userId.ToString() } }
            }
        });
    }

    public async Task<IEnumerable<Collection>> GetCollections()
    {
        var response = await _client.ScanAsync(new ScanRequest()
        {
            TableName = "Collection"
        });

        return CollectionHelper.ParseCollections(response.Items);
    }

    public async Task<IEnumerable<UserCollectible>> GetAllUserCollectibles(Guid userId)
    {
        var response = await _client.QueryAsync(new QueryRequest()
        {
            TableName = "Collectible",
            KeyConditionExpression = "userId = :v_userId",
            FilterExpression = "active = :v_active",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                { ":v_userId", new AttributeValue { S = userId.ToString() } },
                { ":v_active", new AttributeValue { BOOL = true } }
            }
        });
        
        return UserCollectibleHelper.ParseCollectibles(response.Items);
    }

    public async Task PutUserCollectible(Guid userId, string collectibleId, PutCollectibleRequest collectible)
    {
        await _client.PutItemAsync(new PutItemRequest()
        {
            TableName = "Collectible",
            Item = new Dictionary<string, AttributeValue>()
            {
                { "userId", new AttributeValue { S = userId.ToString() } },
                { "collectibleId", new AttributeValue { S = collectibleId } },
                { "active", new AttributeValue { BOOL = collectible.Active } },
                { "description", new AttributeValue { S = collectible.Description } },
                { "collectedAt", new AttributeValue { S = collectible.CollectedAt.ToString(CultureInfo.InvariantCulture) }},
                { "imageUrl", new AttributeValue { S = collectible.ImageUrl } },
                { "bonusAchieved", new AttributeValue { BOOL = collectible.BonusAchieved } }
            }
        });
    }
}
