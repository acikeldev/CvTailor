using System.Text.Json.Serialization;

namespace CvTailor.Api.DTOs;

public record JobMatchResponse(
    [property: JsonPropertyName("matchScore")] int MatchScore,
    [property: JsonPropertyName("summary")] string Summary,
    [property: JsonPropertyName("missingKeywords")] string[] MissingKeywords,
    [property: JsonPropertyName("suggestedImprovements")] Suggestion[] SuggestedImprovements
);

public record Suggestion(
    [property: JsonPropertyName("section")] string Section,
    [property: JsonPropertyName("recommendation")] string Recommendation
);

