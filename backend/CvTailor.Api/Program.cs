using CvTailor.Api.Services;
using CvTailor.Api.Services.LLM;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<ICvService, CvService>();
builder.Services.AddScoped<ILlmService, GeminiLlmService>();
builder.Services.AddScoped<ICvConversionService, CvConversionService>();
builder.Services.Configure<GeminiOptions>(builder.Configuration.GetSection("Gemini"));
builder.Services.AddHttpClient("Gemini");

var app = builder.Build();

app.UseCors(policy=>policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapGet("/hello",()=>"hello world");
app.MapControllers();

app.Run();

