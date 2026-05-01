/*This is the entry point of your .NET API — the Program.cs file. 
It sets up and launches the entire application. It has two main phases:*/
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using PortfolioAPI.Data;
/*Phase 1 — Building/Configuring Services (builder section)
This is where you register everything your app needs before it starts.*/
/*Creates the application builder — the starting point of everything.*/
var builder = WebApplication.CreateBuilder(args);
/*AddControllers() — enables your API controllers (the classes that handle requests)
AddEndpointsApiExplorer() + AddSwaggerGen() — sets up Swagger, a tool 
that auto-generates a UI to test your API endpoints in the browser*/
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
/*Connects your app to a SQLite database called portfolio.db. 
AppDbContext is the class that manages communication with that database.*/
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=portfolio.db"));
// JWT Authentication
var jwtKey = "xK9#mP2$vL7@nQ4&wR6!yT3^uJ8&r#)1";//your-super-secret-key-change-this-to-something-long
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
          options.TokenValidationParameters = new TokenValidationParameters
          {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
          };
    });
/*Sets up a CORS policy called "AllowAll" that allows:

Any website/origin to call your API
Any HTTP method (GET, POST, DELETE, etc.)
Any headers

This is important because your frontend (e.g. a React or HTML page) 
lives on a different origin than your API, and browsers block such 
requests by default without CORS.*/
builder.Services.AddCors(options=>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
/*Phase 2 — Middleware Pipeline (app section)
After building, you define the order in which requests 
are processed. Order matters here.*/
var app = builder.Build();
/*Finalizes the configuration and creates the actual app.
Activates the Swagger UI, accessible at /swagger in your browser.*/
app.UseSwagger();
app.UseSwaggerUI();
/*Applies the CORS policy you defined earlier.*/
app.UseCors("AllowAll");
/*Serves static files (HTML, CSS, JS) from the wwwroot 
folder — useful if your frontend is bundled inside the API project.
UseAuthorization() — enables auth checks (even if 
you're not using it yet, it's good practice)
MapControllers() — connects your controller classes to their routes*/
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseAuthentication(); // <-- must be before UseAuthorization
app.UseAuthorization();
app.MapControllers();
/*Starts the server and begins listening for requests.*/
app.Run();
/*The big picture:
Program.cs starts
      ↓
Registers services (DB, Swagger, CORS, Controllers)
      ↓
Builds the app
      ↓
Sets up middleware pipeline
      ↓
App runs and listens for incoming HTTP requests
Think of this file as the "startup checklist" that 
wires everything together before your API is ready to use.*/
