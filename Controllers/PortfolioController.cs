using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Data;
using PortfolioAPI.Models;
namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private readonly AppDbContext _db;

        public PortfolioController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _db.PortfolioItems.ToListAsync();
            return Ok(items);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _db.PortfolioItems.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }
        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetByCategory(string category)
        {
            var items = await _db.PortfolioItems
                .Where(p => p.Category == category)
                .ToListAsync();
            return Ok(items);
        }
        [HttpPost]
        public async Task<IActionResult> Create(PortfolioItem item)
        {
            _db.PortfolioItems.Add(item);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PortfolioItem updated)
        {
            
            var item = await _db.PortfolioItems.FindAsync(id);
            if (item == null) return NotFound();

            item.Title = updated.Title;
            item.Description = updated.Description;
            item.Category = updated.Category;
            item.ImageUrl = updated.ImageUrl;
            item.ProjectUrl = updated.ProjectUrl;

            await _db.SaveChangesAsync();
            return Ok(item);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _db.PortfolioItems.FindAsync(id);
            if (item == null) return NotFound();

            _db.PortfolioItems.Remove(item);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}