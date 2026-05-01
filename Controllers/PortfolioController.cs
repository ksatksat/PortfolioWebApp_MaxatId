using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using PortfolioAPI.Data;
/*Gives you access to your PortfolioItem model class — the C# representation of a row in your PortfolioItems database table.*/
using PortfolioAPI.Models;
namespace PortfolioAPI.Controllers
{
    /*[controller] gets replaced with Portfolio automatically (removes "Controller" from the name). So all endpoints start with /api/portfolio.*/
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        /*Same Dependency Injection pattern as your other controllers. ASP.NET Core creates AppDbContext and passes it in. _db is your database connection used in every method below.*/
        private readonly AppDbContext _db;

        public PortfolioController(AppDbContext db)
        {
            _db = db;
        }
        /*Responds to GET /api/portfolio — no extra parameters needed, just returns everything.*/
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            /*Fetches every row from the PortfolioItems table and returns them as a JSON array. If the table is empty it returns an empty array [] — not an error.*/
            var items = await _db.PortfolioItems.ToListAsync();
            return Ok(items);
        }
        /*Responds to GET /api/portfolio/5 — the {id} part of the URL becomes the id parameter. So /api/portfolio/5 means id = 5.*/
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            /*FindAsync(id) — searches by primary key (the Id column). Fastest way to find one specific row. If nothing found returns HTTP 404. If found returns HTTP 200 with the item as JSON.*/
            var item = await _db.PortfolioItems.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }
        /*Responds to GET /api/portfolio/category/Game. The {category} from the URL becomes the category parameter. So /api/portfolio/category/Game means category = "Game".*/
        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetByCategory(string category)
        {
            /*.Where(p => p.Category == category) — filters rows where the Category column matches. p => is a lambda — p represents each portfolio item row. This translates to SQL:
            SELECT * FROM PortfolioItems WHERE Category = 'Game'
            Returns matching items as JSON array. If no items match the category — returns empty array [], not an error.*/
            var items = await _db.PortfolioItems
                .Where(p => p.Category == category)
                .ToListAsync();
            return Ok(items);
        }
        /*Responds to POST /api/portfolio. POST is for creating new data. ASP.NET Core automatically reads the JSON from the request body and converts it into a PortfolioItem object.*/
        [Authorize] // <-- protected endpoint, requires valid JWT token in Authorization header
        [HttpPost]
        public async Task<IActionResult> Create(PortfolioItem item)
        {
            /*Add(item) — stages the new item in memory.
            SaveChangesAsync() — executes the SQL INSERT into SQLite. The database automatically assigns an Id to the new item.*/
            _db.PortfolioItems.Add(item);
            await _db.SaveChangesAsync();
            /*Returns HTTP 201 Created — not 200 OK. 201 specifically means "a new resource was created". CreatedAtAction also adds a Location header to the response pointing to where the new item can be found — for example Location: /api/portfolio/13. nameof(GetById) safely references the GetById method by name without hardcoding the string "GetById".*/
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }
        /*Responds to PUT /api/portfolio/5. PUT is for updating existing data. Takes two parameters — id from the URL and updated from the JSON request body.*/
        [Authorize] // <-- protected endpoint, requires valid JWT token in Authorization header
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PortfolioItem updated)
        {
            /*First finds the existing item in the database. If it doesn't exist returns 404 immediately — can't update something that doesn't exist.*/
            var item = await _db.PortfolioItems.FindAsync(id);
            if (item == null) return NotFound();
            /*Copies each field from the incoming updated object onto the existing item. Notice Id is NOT copied — you never want the user to be able to change the ID of a record. Entity Framework tracks changes to item automatically.*/
            item.Title = updated.Title;
            item.Description = updated.Description;

            item.TitleKy = updated.TitleKy;
            item.DescriptionKy = updated.DescriptionKy;
            item.TitleRu = updated.TitleRu;
            item.DescriptionRu = updated.DescriptionRu;

            item.Category = updated.Category;
            item.ImageUrl = updated.ImageUrl;
            item.ProjectUrl = updated.ProjectUrl;
            /*Saves all the field changes to SQLite in one SQL UPDATE statement. Returns the updated item so the caller can see the final result.*/
            await _db.SaveChangesAsync();
            return Ok(item);
        }
        /*Responds to DELETE /api/portfolio/5. DELETE is for removing data.*/
        [Authorize] // <-- protected endpoint, requires valid JWT token in Authorization header
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            /*Finds the item first — if it doesn't exist returns 404. Remove(item) marks it for deletion in memory. SaveChangesAsync() executes the SQL DELETE. Returns HTTP 200 with empty body.*/
            var item = await _db.PortfolioItems.FindAsync(id);
            if (item == null) return NotFound();

            _db.PortfolioItems.Remove(item);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}