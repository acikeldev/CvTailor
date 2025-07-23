using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace CvTailor.Api.Services
{
    public interface ICvService
    {
        Task<object> ReadCv(IFormFile file);
    }
}