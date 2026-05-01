/*Organizes this class into the Models folder/group. This is why other 
files can access it with using PortfolioAPI.Models. Think of 
namespace like a folder address for your code.*/
namespace PortfolioAPI.Models
{
      /*A plain C# class — no inheritance, no special parent class. 
      This is called a POCO — Plain Old CLR Object. It's just a 
      simple container for data. Entity Framework reads this 
      class and automatically knows how to create a matching database table from it.*/
      public class PortfolioItem
      {
            /*The primary key of the table. Entity Framework automatically 
            recognizes a property named Id as the primary key — no extra 
            attributes needed. SQLite auto-increments this number for each new row:
              Id Title: (1 Racing game) (2 Runner game) (3 Fighting game)*/
            public int Id { get; set; }
            /*The name of your portfolio project — for example 
            "Racing game" or "Finance app". = "" sets a default empty 
            string so the property is never null when a new PortfolioItem 
            is created. Without this default C# would warn you 
            that Title could be null.*/
            public string Title { get; set; } = "";
            /*The description text shown under each project — for 
            example "3D game made with Unity.". Same = "" default as Title.*/
            public string Description { get; set; } = "";

            // Kyrgyz
            public string TitleKy { get; set; } = "";
            public string DescriptionKy { get; set; } = "";

            // Russian
            public string TitleRu { get; set; } = "";
            public string DescriptionRu { get; set; } = "";
            /*Used for filtering projects by type. Your PortfolioController 
            uses this in GetByCategory():
                  .Where(p => p.Category == category)
            You could use values like "Game", "WebApp", "3D" to group your projects.*/
            public string Category { get; set; } = "";
            /*Path to the project screenshot image — for example "img/sneakersShop.png". Stores the path as text, not the actual image file. The image file lives in wwwroot/img/.*/
            public string ImageUrl { get; set; } = "";
            /*The link to the live project or repository — for example "https://github.com/ksatksat/FirstPersonParkurGame" or "https://bulbulsup.itch.io/run-from-fire".*/
            public string ProjectUrl { get; set; } = "";
      }
}
/*
How This Class Becomes a Database Table
When you ran dotnet ef migrations add and dotnet ef database update, Entity Framework read this class and created this table in SQLite automatically:
sqlCREATE TABLE PortfolioItems (
    Id          INTEGER PRIMARY KEY AUTOINCREMENT,
    Title       TEXT    NOT NULL DEFAULT '',
    Description TEXT    NOT NULL DEFAULT '',
    Category    TEXT    NOT NULL DEFAULT '',
    ImageUrl    TEXT    NOT NULL DEFAULT '',
    ProjectUrl  TEXT    NOT NULL DEFAULT ''
);
```

Every property becomes a column. The property name becomes the column name. The property type maps to a SQL type:

| C# type | SQLite type |
|---|---|
| `int` | INTEGER |
| `string` | TEXT |
| `bool` | INTEGER (0 or 1) |
| `DateTime` | TEXT |
| `float` | REAL |

---

## How This Class Is Used Across Your Whole App
```
PortfolioItem.cs  (Model — defines the shape)
      ↓
AppDbContext.cs   (DbSet — connects it to the database)
      ↓
PortfolioController.cs  (uses it in every method)
      ↓
SQLite portfolio.db     (actual data stored here)
      ↓
JSON response to browser
      ↓
Your HTML portfolio page
One small class — 10 lines — but it drives the entire portfolio section of your app from database all the way to the browser.
*/