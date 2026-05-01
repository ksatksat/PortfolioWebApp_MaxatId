/*No EntityFrameworkCore needed here — this controller only uses FirstOrDefault() which is a basic LINQ method, not an async database call. Data and Models give access to AppDbContext and VisitorsCount.*/
using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Data;
using PortfolioAPI.Models;
namespace PortfolioAPI.Controllers
{
    /*[controller] becomes Visitor automatically. So the only endpoint is /api/visitor.*/
    [ApiController]
    [Route("api/[controller]")]
    public class VisitorController : ControllerBase
    {
        /*Same Dependency Injection pattern as all your other controllers. Nothing new here.*/
        private readonly AppDbContext _db;

        public VisitorController(AppDbContext db){_db = db;}
        /*Responds to GET /api/visitor. Every time anyone visits your site and this gets called — it does two things at once: reads the current count AND increments it by 1. That's why the method is named GetAndIncrement not just Get.*/
        [HttpGet]
        public async Task<IActionResult> GetAndIncrement()
        {
            /*FirstOrDefault() — tries to get the first row from the VisitorsCounts table. Returns null if the table is completely empty. This is synchronous (no await) because it's a very simple single-row lookup — acceptable for this case.
            Your VisitorsCounts table will only ever have one single row — the counter. It's not a list of visitors, just one number that keeps growing.*/
            var counter = _db.VisitorsCounts.FirstOrDefault();
            /*This runs only on the very first visit ever when the table is completely empty. Creates a brand new VisitorsCount object with Count = 1 — starts at 1 because this first visit is already happening right now. Add(counter) stages it for INSERT into the database.*/
            if (counter == null)
            {
                counter = new VisitorsCount { Count = 1 };
                _db.VisitorsCounts.Add(counter);
            }
            else/*This runs on every visit after the first. counter.Count++ is shorthand for counter.Count = counter.Count + 1. Entity Framework automatically tracks that this object changed — so when SaveChangesAsync() is called it knows to run an UPDATE.*/
            {
                counter.Count++;
            }
            /*Either executes the SQL INSERT (first visit) or SQL UPDATE (every other visit) depending on which branch ran above. await keeps the thread free while SQLite writes.*/
            await _db.SaveChangesAsync();
            /*Returns HTTP 200 with JSON `{"visits":42}` — the current count after incrementing. This is what your `app.js` reads to display the visitor count on the page.*/
            return Ok(new { visits = counter.Count });
        }
    }
}