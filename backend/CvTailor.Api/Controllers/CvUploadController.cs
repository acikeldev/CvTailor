using CvTailor.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CvTailor.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CvUploadController : ControllerBase
    {
        private readonly ICvService _cvService;

        public CvUploadController(ICvService cvService)
        {
            _cvService = cvService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadCv([FromForm] IFormFile file)
        {
            if (file ==null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var cvContent =  await _cvService.ReadCv(file);
            
            return Ok(cvContent);
        }
    }
}