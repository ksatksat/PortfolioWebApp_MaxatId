using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using PortfolioAPI.Data;
// wanna read explanation to this code? follow this link:
//https://docs.google.com/document/d/1h0eGQOIEkUZnbhk2kMLVMn2sfat3E7rp3srI3rHfGMQ/edit?tab=t.0
namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly string _jwtKey;

        public AuthController(AppDbContext db, IConfiguration configuration)
        {
            _db = db;
            _jwtKey = configuration["JwtKey"]
                ?? throw new Exception("JwtKey not configured!");
        }

        // POST /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var admin = await _db.AdminUsers.FindAsync(1);
            if (admin == null) return Unauthorized("No admin user found.");

            bool isValid = BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash);
            if (!isValid) return Unauthorized("Invalid password.");

            // Generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { token = tokenString });
        }
    }

    public class LoginRequest
    {
        public string Password { get; set; } = "";
    }
}