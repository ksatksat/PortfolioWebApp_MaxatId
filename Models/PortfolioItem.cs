//wana know how this code works? follow the link below
//https://docs.google.com/document/d/1qDXgNdoRuEeyod_9zdIFSnEcm-tB8-wiYGp3tY6jCWA/edit?tab=t.0
namespace PortfolioAPI.Models
{
      public class PortfolioItem
      {
            public int Id { get; set; }
            // English
            public string Title { get; set; } = "";
            public string Description { get; set; } = "";
            // Kyrgyz
            public string TitleKy { get; set; } = "";
            public string DescriptionKy { get; set; } = "";
            // Russian
            public string TitleRu { get; set; } = "";
            public string DescriptionRu { get; set; } = "";
            public string Category { get; set; } = "";
            public string ImageUrl { get; set; } = "";
            public string ProjectUrl { get; set; } = "";
      }
}
/*
How This Class Becomes a Database Table
When you ran dotnet ef migrations add and dotnet ef database update, 
Entity Framework read this class and created this table in SQLite automatically:
sqlCREATE TABLE PortfolioItems (
    Id          INTEGER PRIMARY KEY AUTOINCREMENT,
    Title       TEXT    NOT NULL DEFAULT '',
    Description TEXT    NOT NULL DEFAULT '',
    Category    TEXT    NOT NULL DEFAULT '',
    ImageUrl    TEXT    NOT NULL DEFAULT '',
    ProjectUrl  TEXT    NOT NULL DEFAULT ''
);
```

Every property becomes a column. The property name becomes the column name. 
The property type maps to a SQL type:

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
One small class — 10 lines — but it drives the entire portfolio 
section of your app from database all the way to the browser.
*/