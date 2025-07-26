using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using CvTailor.Api.DTOs;

namespace CvTailor.Api.Services.LLM;

public class GeminiLlmService : ILlmService
{
    private readonly string _apiKey;
    private readonly string _model;
    private readonly string _url;
    private readonly HttpClient _client;
    private readonly string _cvPrompt;
    private readonly string _cvSchema;
    private readonly ILogger<GeminiLlmService> _logger;
    public GeminiLlmService (IOptions<GeminiOptions> options, IHttpClientFactory factory, ILogger<GeminiLlmService> logger)
    {
        _apiKey = options.Value.ApiKey;
        _model = options.Value.Model;
        _url = options.Value.Url;
        _client = factory.CreateClient("Gemini");
        _cvPrompt = File.ReadAllText("prompts/cv_suggestion.txt");
        _cvSchema = File.ReadAllText("schemas/cv_suggestion_schema.json");
        _logger = logger;
    }
    public async Task<GeminiApiResponse> CommentateCv(string cvContent)
    {
        var schemaObject = JsonSerializer.Deserialize<object>(_cvSchema);
        string prompt = _cvPrompt.Replace("{cvContent}", cvContent);

        var url = $"{_url}/{_model}:generateContent?key={_apiKey}";

        var requestBody = new
        {
            contents = new[]
            {
                new { parts = new[] { new { text = prompt} } }
            },
            generationConfig = new
            {
                responseMimeType = "application/json",
                responseSchema = schemaObject
            }
        };
        
     try{
        var response = await _client.PostAsJsonAsync(url, requestBody);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            _logger.LogError("Gemini API returned error: {ErrorContent}", errorContent);
            throw new Exception($"Gemini API returned error: {errorContent}");
        }

        var geminiResponse = await response.Content.ReadFromJsonAsync<GeminiApiResponse>();
        if (geminiResponse == null)
        {
            throw new Exception("Failed to parse Gemini response");
        }

        return geminiResponse;
     }
     catch (HttpRequestException ex)
     {
        _logger.LogError(ex, "Error calling Gemini API");
        throw;
     }
     catch (JsonException ex)
     {
        _logger.LogError(ex, "Error parsing Gemini response");
        throw;
     }
     catch (Exception ex)
     {
        _logger.LogError(ex, "Unexpected error in Gemini API call");
        throw;
     }
    }
}