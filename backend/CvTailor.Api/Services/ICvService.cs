using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace CvTailor.Api.Services
{
    public interface ICvService
    {
        Task<string> ReadCv(IFormFile file);
    }
}