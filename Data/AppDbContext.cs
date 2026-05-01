/*Gives you access to DbContext and DbSet — the two core classes 
of Entity Framework Core. Without this line the rest of the code wouldn't compile.*/
using Microsoft.EntityFrameworkCore;
/*Gives you access to your three model classes — PortfolioItem, 
ContactMessage, VisitorsCount. These are the C# classes that 
represent your database tables.*/
using PortfolioAPI.Models;
namespace PortfolioAPI.Data
{
    /*AppDbContext is your custom database context class.
     : DbContext means it inherits from Entity Framework's 
     DbContext — this gives it all the database connection 
     logic, change tracking, and SQL generation for free. 
     Think of AppDbContext as the bridge between your C# 
     code and your SQLite database file.*/
    public class AppDbContext : DbContext
    {
        /*DbContextOptions<AppDbContext> — contains the database 
        configuration, specifically the connection string that 
        tells EF Core where your SQLite file is. You set this 
        up in Program.cs with this line:
        options.UseSqlite("Data Source=portfolio.db")
        : base(options) — passes those options up to the parent 
        DbContext class so it knows how to connect. The { } body 
        is empty because the parent handles everything — 
        nothing extra needed here.
        This constructor is called automatically by ASP.NET Core's 
        Dependency Injection — you never call it yourself directly.*/
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options){}
        /*: base(options) — passes those options up to the parent 
        DbContext class so it knows how to connect. The { } body 
        is empty because the parent handles everything — 
        nothing extra needed here.
        This constructor is called automatically by ASP.NET 
        Core's Dependency Injection — you never call it yourself directly.*/
        public DbSet<PortfolioItem> PortfolioItems { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<VisitorsCount> VisitorsCounts { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
    }
}