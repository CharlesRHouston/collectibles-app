using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

namespace Collectibles.Backend.Api.Helpers;

public static class UserHelper
{
    public static void AddToUpdatesIfNotNull(
        Dictionary<string, AttributeValueUpdate> updates,
        string key, 
        string? value)
    {
        if (value != null)
        {
            updates[key] = new AttributeValueUpdate
            {
                Action = AttributeAction.PUT,
                Value = new AttributeValue { S = value }
            };
        }
    }

    public static void AddToUpdatesIfNotNull(
        Dictionary<string, AttributeValueUpdate> updates,
        string key, 
        string? value,
        Func<string, string> action)
    {
        if (value != null)
        {
            updates[key] = new AttributeValueUpdate
            {
                Action = AttributeAction.PUT,
                Value = new AttributeValue { S = action(value) }
            };
        }
    }
}