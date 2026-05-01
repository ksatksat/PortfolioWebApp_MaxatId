using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using PortfolioAPI.Data;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private const string JwtKey = "xK9#mP2$vL7@nQ4&wR6!yT3^uJ8&r#)1";//your-super-secret-key-change-this-to-something-long

        public AuthController(AppDbContext db)
        {
            _db = db;
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
            var key = Encoding.UTF8.GetBytes(JwtKey);
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

        // POST /api/auth/setup  <-- run this ONCE to create your admin password
        [HttpPost("setup")]
        public async Task<IActionResult> Setup([FromBody] LoginRequest request)
        {
            var existing = await _db.AdminUsers.FindAsync(1);
            if (existing != null) return BadRequest("Admin already exists.");

            var hashed = BCrypt.Net.BCrypt.HashPassword(request.Password);
            _db.AdminUsers.Add(new PortfolioAPI.Models.AdminUser { PasswordHash = hashed });
            await _db.SaveChangesAsync();

            return Ok("Admin created successfully.");
        }
    }

    public class LoginRequest
    {
        public string Password { get; set; } = "";
    }
}