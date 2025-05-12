namespace Collectibles.Backend.Api.Models;

public class UserCollectible
{
    public Guid UserId { get; set; }
    public string CollectibleId { get; set; }
    public bool? Active { get; set; }
    public string Description { get; set; }
    public DateTime CollectedAt { get; set; }
    public string ImageUrl { get; set; }
    public bool? BonusAchieved { get; set; }
}

public class PutCollectibleRequest
{
    public bool? Active { get; set; }
    public string Description { get; set; }
    public DateTime CollectedAt { get; set; }
    public string ImageUrl { get; set; }
    public bool? BonusAchieved { get; set; }
    public string CollectionId { get; set; }
}