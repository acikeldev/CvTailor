using CvTailor.Api.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<ICvService, CvService>();

var app = builder.Build();

app.UseCors(policy=>policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapGet("/hello",()=>"hello world");
app.MapControllers();

app.Run();

