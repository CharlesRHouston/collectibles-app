using Amazon.DynamoDBv2.Model;
using Collectibles.Backend.Api.Models;

namespace Collectibles.Backend.Api.Helpers;

public static class CollectionHelper
{
    public static List<Collection> ParseCollections(List<Dictionary<string, AttributeValue>> items)
    {
        var collections = new List<Collection>();

        foreach (var item in items)
        {
            collections.Add(new Collection
            {
                Id = item["id"].S,
                Name = item["name"].S,
                Country = item["country"].S,
                Categories = ParseCategories(item["categories"].L)
            });
        }

        return collections;
    }

    private static IEnumerable<Category> ParseCategories(List<AttributeValue> categoriesAttribute)
    {
        var categories = new List<Category>();

        foreach (var categoryAttribute in categoriesAttribute)
        {
            var category = new Category
            {
                Id = categoryAttribute.M["id"].S,
                Name = categoryAttribute.M["name"].S,
                Type = (CategoryType)Enum.Parse(typeof(CategoryType), categoryAttribute.M["type"].S),
                Collectibles = ParseCollectibles(categoryAttribute.M["collectibles"].L)
            };

            categories.Add(category);
        }

        return categories;
    }

    private static IEnumerable<Collectible> ParseCollectibles(List<AttributeValue> collectiblesAttribute)
    {
        var collectibles = new List<Collectible>();

        foreach (var collectibleAttribute in collectiblesAttribute)
        {
            var collectible = new Collectible
            {
                Id = collectibleAttribute.M["id"].S,
                Name = collectibleAttribute.M["name"].S,
                Clue = collectibleAttribute.M["clue"].S,
                PixelArtFilename = collectibleAttribute.M["pixelArtFilename"].S,
                Bonus = ParseBonus(collectibleAttribute.M["bonus"].M)
            };

            collectibles.Add(collectible);
        }

        return collectibles;
    }

    private static Bonus ParseBonus(Dictionary<string, AttributeValue> bonusAttribute)
    {
        return new Bonus
        {
            Description = bonusAttribute["description"].S,
            Question = bonusAttribute["question"].S
        };
    }
}