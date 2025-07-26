using System.Text.Json.Serialization;

namespace CvTailor.Api.DTOs
{
    public record GeminiApiResponse(
        [property: JsonPropertyName("candidates")] Candidate[] Candidates
    );

    public record Candidate(
        [property: JsonPropertyName("content")] Content Content
    );

    public record Content(
        [property: JsonPropertyName("parts")] Part[] Parts
    );

    public record Part(
        [property: JsonPropertyName("text")] string Text
    );
}