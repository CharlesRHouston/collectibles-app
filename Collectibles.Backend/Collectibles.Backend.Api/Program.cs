using Amazon.DynamoDBv2;
using Amazon.S3;
using Collectibles.Backend.Api.Extensions;
using Collectibles.Backend.Api.Models;
using Collectibles.Backend.Api.Services;
using Collectibles.Backend.Api.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddJwtAuthentication(builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>());

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IDatabaseAccessService, DatabaseAccessService>();
builder.Services.AddScoped<AmazonDynamoDBClient>();
builder.Services.AddScoped<AmazonS3Client>();

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.Configure<S3Settings>(builder.Configuration.GetSection("S3Settings"));

builder.WebHost.UseUrls("http://*:80");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();