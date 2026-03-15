using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;
namespace PortfolioAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options){}
        public DbSet<PortfolioItem> PortfolioItems { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<VisitorsCount> VisitorsCounts { get; set; }
    }
}