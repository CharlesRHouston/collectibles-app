using Amazon.DynamoDBv2.Model;
using Collectibles.Backend.Api.Models;

namespace Collectibles.Backend.Api.Helpers;

public static class UserCollectibleHelper
{
    public static IEnumerable<UserCollectible> ParseCollectibles(List<Dictionary<string,AttributeValue>> items)
    {
        var collectibles = new List<UserCollectible>();

        foreach (var item in items)
        {
            collectibles.Add(new UserCollectible()
            {
                UserId = Guid.Parse(item["userId"].S),
                CollectibleId = item["collectibleId"].S,
                CategoryId = item["categoryId"].S,
                CollectionId = item["collectionId"].S,
                Active = item["active"].BOOL,
                Description = item["description"].S,
                BonusAchieved = item["bonusAchieved"]?.BOOL,
                CollectedAt = Convert.ToDateTime(item["collectedAt"].S),
                CategoryType = Enum.Parse<CategoryType>(item["categoryType"].S),
            });
        }
        
        return collectibles;
    }
}