using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Data;
namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _db;
        private const string AdminPassword = "491devAdmin@_home";
        public AdminController(AppDbContext db) { _db = db; }
        [HttpGet]
        public IActionResult AdminPage()
        {
            return PhysicalFile(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", 
                "admin.html"), "text/html"
            );
        }
        [HttpGet("messages")]
        public async Task<IActionResult> GetMessages([FromQuery] string password)
        {
            if (password != AdminPassword)
                return Unauthorized(new { error = "Wrong password." });
            var messages = await _db.ContactMessages
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
            return Ok(messages);
        }
        [HttpPut("messages/{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id, [FromQuery] string password)
        {
            if (password != AdminPassword)
                return Unauthorized(new { error = "Wrong password." });
            var msg = await _db.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();

            msg.IsRead = true;
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }
        [HttpDelete("messages/{id}")]
        public async Task<IActionResult> DeleteMessage(int id, [FromQuery] string password)
        {
            if (password != AdminPassword)
                return Unauthorized(new { error = "Wrong password." });
            var msg = await _db.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();

            _db.ContactMessages.Remove(msg);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }
    }
}