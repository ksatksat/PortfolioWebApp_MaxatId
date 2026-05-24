using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Data;
using PortfolioAPI.Models;
//wanna know how this works? read the explanation here:
//https://docs.google.com/document/d/1LETGqJ8j4JIOynHIh_SvrFo19craA9qowNgEkqQWLTE/edit?tab=t.0
namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitorController : ControllerBase
    {
        private readonly AppDbContext _db;

        public VisitorController(AppDbContext db){_db = db;}
        [HttpGet]
        public async Task<IActionResult> GetAndIncrement()
        {
            var counter = _db.VisitorsCounts.FirstOrDefault();
            if (counter == null)
            {
                counter = new VisitorsCount { Count = 1 };
                _db.VisitorsCounts.Add(counter);
            }
            else
            {
                counter.Count++;
            }
            await _db.SaveChangesAsync();
            return Ok(new { visits = counter.Count });
        }
    }
}