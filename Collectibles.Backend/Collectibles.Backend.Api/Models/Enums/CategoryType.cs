using System.Text.Json.Serialization;

namespace Collectibles.Backend.Api.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum CategoryType
{
    IconicPlaces,
    FaunaAndFlora,
    FoodAndCulture
}