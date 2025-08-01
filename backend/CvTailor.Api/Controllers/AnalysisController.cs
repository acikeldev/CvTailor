using CvTailor.Api.Services;
using CvTailor.Api.Services.LLM;
using Microsoft.AspNetCore.Mvc;

namespace CvTailor.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalysisController : ControllerBase
    {
        private readonly ICvService _cvService;
        private readonly ILlmService _llmService;

        public AnalysisController(ICvService cvService, ILlmService llmService)
        {
            _cvService = cvService;
            _llmService = llmService;
        }

        [HttpPost("cv-suggestion")]
        public async Task<IActionResult> AnalyzeCv([FromForm] IFormFile file)
        {
            if (file ==null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var cvContent =  await _cvService.ReadCv(file);

            var cvAnalysisResponse = await _llmService.CommentateCv(cvContent);

            return Ok(cvAnalysisResponse);
        }

        [HttpPost("job-match")]
        public async Task<IActionResult> MatchCvToJob([FromForm] IFormFile file, [FromForm] string jobDescription)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var cvContent = await _cvService.ReadCv(file);

            var jobMatchResponse = await _llmService.MatchCvToJob(cvContent, jobDescription);

            return Ok(jobMatchResponse);
        }
    }
}