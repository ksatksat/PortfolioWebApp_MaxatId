using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Data;
using PortfolioAPI.Models;
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