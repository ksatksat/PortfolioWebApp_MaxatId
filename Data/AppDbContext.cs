using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;
//wanna know how this works? read the explanation here:
//https://docs.google.com/document/d/1QzWNiVJIIKI_LmUTOqvyJuKVQvCytFX4mwJLAHRCyF8/edit?tab=t.0
namespace PortfolioAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options){}
        public DbSet<PortfolioItem> PortfolioItems { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<VisitorsCount> VisitorsCounts { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
    }
}