using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using CvTailor.Api.DTOs;
using CvTailor.Api.Models;

namespace CvTailor.Api.Services.LLM;

public class GeminiLlmService : ILlmService
{
    private readonly string _apiKey;
    private readonly string _model;
    private readonly string _url;
    private readonly HttpClient _client;
    private readonly string _cvPrompt;
    private readonly string _cvSchema;
    private readonly string _jobMatchPrompt;
    private readonly string _jobMatchSchema;
    private readonly string _harvardCvSchema;
    private readonly ILogger<GeminiLlmService> _logger;

    public GeminiLlmService (IOptions<GeminiOptions> options, IHttpClientFactory factory, ILogger<GeminiLlmService> logger)
    {
        _apiKey = options.Value.ApiKey;
        _model = options.Value.Model;
        _url = options.Value.Url;
        _client = factory.CreateClient("Gemini");
        _cvPrompt = File.ReadAllText("prompts/cv_suggestion.txt");
        _cvSchema = File.ReadAllText("schemas/cv_suggestion_schema.json");
        _jobMatchPrompt = File.ReadAllText("prompts/job_match_prompt.txt");
        _jobMatchSchema = File.ReadAllText("schemas/job_match_schema.json");
        _harvardCvSchema = File.ReadAllText("schemas/harvard_cv_schema.json");
        _logger = logger;
    }


    private async Task<T> CallGemini<T>(string prompt, string schema)
    {
        var url = $"{_url}/{_model}:generateContent?key={_apiKey}";
        var schemaObject = JsonSerializer.Deserialize<JsonElement>(schema);
        var requestBody = new 
        {
            contents = new[]{ new {parts = new[] {new {text = prompt}}}},
            generationConfig = new{responseMimeType = "application/json", responseSchema = schemaObject}
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
            var geminiText = geminiResponse?.Candidates?.FirstOrDefault()?.Content?.Parts?.FirstOrDefault()?.Text;
            if (geminiText == null)
            {
                throw new Exception("Failed to extract text from Gemini API response.");
            }

            var result = JsonSerializer.Deserialize<T>(geminiText, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (result == null)
                throw new Exception("Failed to deserialize Gemini text to the expected type.");
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error in Gemini API call");
            throw;
        }
    }
    public async Task<CvAnalysisResponse> CommentateCv(string cvContent)
    {
        string prompt  = _cvPrompt.Replace("{cvContent}", cvContent);
        return await CallGemini<CvAnalysisResponse>(prompt, _cvSchema);
    }

    public async Task<JobMatchResponse> MatchCvToJob(string cvContent, string jobDescription)
    {
        string prompt = _jobMatchPrompt.Replace("{cvContent}", cvContent).Replace("{jobDescription}", jobDescription);
        
        return await CallGemini<JobMatchResponse>(prompt, _jobMatchSchema);
    }

    public async Task<string> GetResponseAsync(string prompt)
    {
        var url = $"{_url}/{_model}:generateContent?key={_apiKey}";
        var requestBody = new 
        {
            contents = new[]{ new {parts = new[] {new {text = prompt}}}},
            generationConfig = new{responseMimeType = "text/plain"}
        };

        try
        {
            var response = await _client.PostAsJsonAsync(url, requestBody);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("Gemini API returned error: {ErrorContent}", errorContent);
                throw new Exception($"Gemini API returned error: {errorContent}");
            }

            var geminiResponse = await response.Content.ReadFromJsonAsync<GeminiApiResponse>();
            var geminiText = geminiResponse?.Candidates?.FirstOrDefault()?.Content?.Parts?.FirstOrDefault()?.Text;
            
            if (geminiText == null)
            {
                throw new Exception("Failed to extract text from Gemini API response.");
            }

            return geminiText;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error in Gemini API call");
            throw;
        }
    }

    public async Task<HarvardCvModel> ConvertToHarvardFormatAsync(string cvText)
    {
        var promptTemplate = File.ReadAllText("prompts/cv_conversion_prompt.txt");
        var prompt = promptTemplate.Replace("{cvText}", cvText);
        return await CallGemini<HarvardCvModel>(prompt, _harvardCvSchema);
    }

    public async Task<CvEnhancementResponse> EnhanceCvAsync(HarvardCvModel cv, List<string> suggestions)
    {
        var promptTemplate = File.ReadAllText("prompts/cv_enhancement_prompt.txt");
        var cvJson = JsonSerializer.Serialize(cv, new JsonSerializerOptions { WriteIndented = true });
        var suggestionsText = string.Join("\n", suggestions);
        
        var prompt = promptTemplate
            .Replace("{cvJson}", cvJson)
            .Replace("{suggestionsText}", suggestionsText);

        var enhancedCv = await CallGemini<HarvardCvModel>(prompt, _harvardCvSchema);
        
        // Parse changes from the response (we'll need to modify this to get the full response)
        var changes = new List<CvChange>(); // For now, empty list
        
        return new CvEnhancementResponse
        {
            EnhancedCv = enhancedCv,
            Changes = changes
        };
    }
}