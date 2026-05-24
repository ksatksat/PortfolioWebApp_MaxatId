using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Data;
using PortfolioAPI.Models;
//wanna know how this works? read the explanation here:
//https://docs.google.com/document/d/1VfLEMlRAXdblfk3vfM-Qno6qZFoYHKGnSf-KhhJtG3g/edit?tab=t.0
namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ContactController(AppDbContext db){_db = db;}
        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactMessage msg)
        {
            msg.SentAt = DateTime.UtcNow;
            msg.IsRead = false;
            _db.ContactMessages.Add(msg);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, message = "Message received!" });
        }
        /*[HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _db.ContactMessages
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
            return Ok(messages);
        }
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var msg = await _db.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();
            msg.IsRead = true;
            await _db.SaveChangesAsync();
            return Ok();
        }*/
    }
}