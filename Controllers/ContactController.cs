using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Data;
/*Gives you access to your own ContactMessage model class — the C# representation of a row in your ContactMessages database table.*/
using PortfolioAPI.Models;
namespace PortfolioAPI.Controllers
{
    /*Sets the URL for this controller. [controller] is automatically replaced with the class name minus "Controller" — so ContactController becomes /api/contact. Every endpoint in this class starts with /api/contact.*/
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        /*Same Dependency Injection pattern as AdminController. ASP.NET Core creates AppDbContext and hands it to you automatically. _db is your database connection used in all three methods below.*/
        private readonly AppDbContext _db;

        public ContactController(AppDbContext db){_db = db;}
        /*[HttpPost] — responds to POST requests at /api/contact. POST is used for creating new data.
        ContactMessage msg — ASP.NET Core automatically reads the JSON from the request body and converts it into a ContactMessage object. So when your app.js sends:
        { "name": "Maksat", "email": "a@b.com", "message": "Hello" }
        It becomes a ContactMessage object with those values filled in.*/

        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactMessage msg)
        {
            /*Sets the timestamp to right now in UTC time. UTC is used instead of local time so the time is consistent regardless of what timezone the server is in.*/
            msg.SentAt = DateTime.UtcNow;
            /*Forces IsRead to false — every new message starts as unread, regardless of what the user sent. This is a security measure so users can't send "isRead": true themselves.*/
            msg.IsRead = false;
            /*Add(msg) — stages the new message for insertion in memory.
            SaveChangesAsync() — executes the actual SQL INSERT into SQLite. await keeps the thread free while the database works.*/
            _db.ContactMessages.Add(msg);
            await _db.SaveChangesAsync();
            /*Returns HTTP 200 with JSON {"success":true,"message":"Message received!"}. This is what your app.js reads to show the success alert.*/
            return Ok(new { success = true, message = "Message received!" });
        }
        /*[HttpGet] — responds to GET requests at /api/contact. GET is used for reading data. No parameters needed — just returns everything.*/
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            /*Fetches all messages from the database, sorted newest first. Returns them as a JSON array. This is what Swagger calls when you test GET /api/contact.*/
            var messages = await _db.ContactMessages
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
            return Ok(messages);
        }
        /*[HttpPut] — responds to PUT requests. PUT is used for updating existing data.
        "{id}/read" — full URL is /api/contact/5/read where 5 is the message ID.
        int id — ASP.NET Core extracts 5 from the URL and puts it here automatically.*/
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            /*Looks up the message by ID. If no message with that ID exists — returns HTTP 404. This prevents crashes if someone calls the endpoint with an invalid ID.*/
            var msg = await _db.ContactMessages.FindAsync(id);
            if (msg == null) return NotFound();
            msg.IsRead = true;
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}