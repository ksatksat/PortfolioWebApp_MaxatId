using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using PortfolioAPI.Data;
//wanna know how this works? read the explanation here:
//https://docs.google.com/document/d/1L1R4LVR6dbn6axGIvDDruNFgS44OEVws0AiNEt6vwXo/edit?tab=t.0
namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AdminController(AppDbContext db) { _db = db; }

        [HttpGet]
        public IActionResult AdminPage()
        {
            return PhysicalFile(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot",
                "admin.html"), "text/html"
            );
        }

        [Authorize]
        [HttpGet("messages")]
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _db.ContactMessages
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
            return Ok(messages);
        }

        [Authorize]
        [HttpPut("messages/{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var msg = await _db.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();
            msg.IsRead = true;
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        [Authorize]
        [HttpDelete("messages/{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var msg = await _db.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();
            _db.ContactMessages.Remove(msg);
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }
    }
}