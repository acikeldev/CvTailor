using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using UglyToad.PdfPig;

namespace CvTailor.Api.Services
{
    public class CvService : ICvService
    {
        public async Task<object> ReadCv(IFormFile file)
        {
            var tempFilePath = Path.GetTempFileName();
            using(var stream = new FileStream(tempFilePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var sb = new StringBuilder();
            using(var pdf = PdfDocument.Open(tempFilePath))
            {
                foreach (var page in pdf.GetPages())
                {
                    sb.AppendLine(page.Text);
                }
            }

            File.Delete(tempFilePath);

            return new {message="CV uploaded successfully",content=sb.ToString()};
        }
    }
}