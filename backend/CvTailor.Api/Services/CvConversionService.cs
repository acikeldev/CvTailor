using CvTailor.Api.Models;
using CvTailor.Api.Services.LLM;
using System.Text.Json;

namespace CvTailor.Api.Services;

public interface ICvConversionService
{
    Task<HarvardCvModel> ConvertToHarvardFormatAsync(string cvText);
    Task<CvEnhancementResponse> UpdateWithSuggestionsAsync(HarvardCvModel cv, List<string> suggestions);
    Task<string> ExportToPdfAsync(HarvardCvModel cv);
}

public class CvConversionService : ICvConversionService
{
    private readonly ILlmService _llmService;
    private readonly ILogger<CvConversionService> _logger;

    public CvConversionService(ILlmService llmService, ILogger<CvConversionService> logger)
    {
        _llmService = llmService;
        _logger = logger;
    }

    public async Task<HarvardCvModel> ConvertToHarvardFormatAsync(string cvText)
    {
        try
        {
            _logger.LogInformation("Starting CV conversion to Harvard format. CV text length: {CvTextLength}", cvText?.Length ?? 0);

            if (string.IsNullOrWhiteSpace(cvText))
            {
                _logger.LogWarning("CV text is null or empty");
                return new HarvardCvModel();
            }

            _logger.LogInformation("Calling LLM service for CV conversion");
            var harvardCv = await _llmService.ConvertToHarvardFormatAsync(cvText);
            _logger.LogInformation("Successfully converted CV to Harvard format");
            
            return harvardCv;
        }
        catch (JsonException jsonEx)
        {
            _logger.LogError(jsonEx, "JSON Deserialization Error during CV conversion: {Message}", jsonEx.Message);
            throw new Exception("Failed to parse LLM response as JSON", jsonEx);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error converting CV to Harvard format: {Message}", ex.Message);
            throw new Exception("Failed to convert CV to Harvard format", ex);
        }
    }

    public async Task<CvEnhancementResponse> UpdateWithSuggestionsAsync(HarvardCvModel cv, List<string> suggestions)
    {
        try
        {
            _logger.LogInformation("Starting AI enhancement with {SuggestionCount} suggestions", suggestions.Count);
            
            _logger.LogInformation("Calling LLM service for CV enhancement");
            var enhancementResponse = await _llmService.EnhanceCvAsync(cv, suggestions);
            _logger.LogInformation("Successfully enhanced CV with AI suggestions");
            
            return enhancementResponse;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error enhancing CV with suggestions: {Message}", ex.Message);
            throw new Exception("Failed to enhance CV with suggestions", ex);
        }
    }

    private List<CvChange> ParseAIChangesSummary(string response, HarvardCvModel enhancedCv)
    {
        var changes = new List<CvChange>();

        try
        {
            // Find CHANGES_SUMMARY section in the response
            var changesIndex = response.IndexOf("CHANGES_SUMMARY:");
            if (changesIndex == -1)
            {
                _logger.LogWarning("No CHANGES_SUMMARY found in AI response");
                return changes;
            }

            var changesText = response.Substring(changesIndex);
            var lines = changesText.Split('\n', StringSplitOptions.RemoveEmptyEntries);

            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();
                if (trimmedLine.StartsWith("CHANGES_SUMMARY:") || !trimmedLine.StartsWith("-"))
                    continue;

                // Parse line format: "- Section: [section], Field: [field], Change: [description]"
                var changeMatch = System.Text.RegularExpressions.Regex.Match(trimmedLine, 
                    @"Section:\s*([^,]+),\s*Field:\s*([^,]+),\s*Change:\s*(.+)");

                if (changeMatch.Success)
                {
                    var section = changeMatch.Groups[1].Value.Trim();
                    var field = changeMatch.Groups[2].Value.Trim();
                    var description = changeMatch.Groups[3].Value.Trim();

                    changes.Add(new CvChange
                    {
                        Section = section,
                        Field = field,
                        OldValue = "Original content",
                        NewValue = "Enhanced content",
                        ChangeType = GetChangeTypeFromDescription(description),
                        Description = description
                    });
                }
            }

            _logger.LogInformation("Successfully parsed {ChangeCount} changes from AI response", changes.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error parsing AI changes summary");
        }

        return changes;
    }

    private string GetChangeTypeFromDescription(string description)
    {
        var lowerDesc = description.ToLower();
        if (lowerDesc.Contains("action verb") || lowerDesc.Contains("improved"))
            return "enhanced";
        if (lowerDesc.Contains("added") || lowerDesc.Contains("quantifiable"))
            return "added";
        if (lowerDesc.Contains("keyword") || lowerDesc.Contains("terminology"))
            return "optimized";
        if (lowerDesc.Contains("strengthen") || lowerDesc.Contains("impact"))
            return "improved";
        
        return "enhanced";
    }

    public Task<string> ExportToPdfAsync(HarvardCvModel cv)
    {
        // TODO: Implement PDF export functionality
        // For now, return a placeholder
        return Task.FromResult("PDF export functionality will be implemented in the next phase");
    }
} 