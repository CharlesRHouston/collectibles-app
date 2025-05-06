using System.Text.Json.Serialization;

namespace Collectibles.Backend.Api.Models;

public class Collection
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Country { get; set; }
    public IEnumerable<Category> Categories { get; set; }
}

public class Category
{
    public string Id { get; set; }
    public string Name { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public CategoryType Type { get; set; }
    public IEnumerable<Collectible> Collectibles { get; set; }
}

public class Collectible
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Clue { get; set; }
    public string PixelArtFilename { get; set; }
    public Bonus Bonus { get; set; }
}

public class Bonus
{
    public string Description { get; set; }
    public string Question { get; set; }
}
