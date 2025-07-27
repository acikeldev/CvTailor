using CvTailor.Api.DTOs;
using CvTailor.Api.Models;

namespace CvTailor.Api.Services.LLM;

public interface ILlmService
{
    Task<CvAnalysisResponse> CommentateCv(string cvContent);
    Task<JobMatchResponse> MatchCvToJob(string cvContent, string jobDescription);
    Task<string> GetResponseAsync(string prompt);
    Task<HarvardCvModel> ConvertToHarvardFormatAsync(string cvText);
    Task<CvEnhancementResponse> EnhanceCvAsync(HarvardCvModel cv, List<string> suggestions);
}