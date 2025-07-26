using CvTailor.Api.DTOs;

namespace CvTailor.Api.Services.LLM;

public interface ILlmService
{
    Task<GeminiApiResponse> CommentateCv(string cvContent);
}