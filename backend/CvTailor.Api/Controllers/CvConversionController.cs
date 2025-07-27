using CvTailor.Api.Models;
using CvTailor.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CvTailor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CvConversionController : ControllerBase
{
    private readonly ICvConversionService _cvConversionService;
    private readonly ILogger<CvConversionController> _logger;

    public CvConversionController(ICvConversionService cvConversionService, ILogger<CvConversionController> logger)
    {
        _cvConversionService = cvConversionService;
        _logger = logger;
    }

    [HttpPost("convert-to-harvard")]
    public async Task<ActionResult<HarvardCvModel>> ConvertToHarvardFormat([FromBody] ConvertCvRequest request)
    {
        try
        {
            _logger.LogInformation("Received CV conversion request. CV text length: {CvTextLength}", request.CvText?.Length ?? 0);

            if (string.IsNullOrWhiteSpace(request.CvText))
            {
                _logger.LogWarning("CV text is null or empty in request");
                return BadRequest("CV text is required");
            }

            var harvardCv = await _cvConversionService.ConvertToHarvardFormatAsync(request.CvText);
            _logger.LogInformation("Successfully converted CV to Harvard format");
            return Ok(harvardCv);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error converting CV to Harvard format: {Message}", ex.Message);
            return StatusCode(500, $"An error occurred while converting the CV: {ex.Message}");
        }
    }

    [HttpPost("update-with-suggestions")]
    public async Task<ActionResult<CvEnhancementResponse>> UpdateWithSuggestions([FromBody] UpdateCvRequest request)
    {
        try
        {
            if (request.Cv == null)
            {
                return BadRequest("CV data is required");
            }

            if (request.Suggestions == null || !request.Suggestions.Any())
            {
                return BadRequest("At least one suggestion is required");
            }

            var enhancementResponse = await _cvConversionService.UpdateWithSuggestionsAsync(request.Cv, request.Suggestions);
            return Ok(enhancementResponse);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating CV with suggestions");
            return StatusCode(500, "An error occurred while updating the CV");
        }
    }

    [HttpPost("export-pdf")]
    public async Task<ActionResult<string>> ExportToPdf([FromBody] HarvardCvModel cv)
    {
        try
        {
            if (cv == null)
            {
                return BadRequest("CV data is required");
            }

            var pdfUrl = await _cvConversionService.ExportToPdfAsync(cv);
            return Ok(new { pdfUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error exporting CV to PDF");
            return StatusCode(500, "An error occurred while exporting the CV");
        }
    }
}

public class ConvertCvRequest
{
    public string CvText { get; set; } = string.Empty;
}

public class UpdateCvRequest
{
    public HarvardCvModel Cv { get; set; } = new();
    public List<string> Suggestions { get; set; } = new();
} 