/*
This is a C# model class for a portfolio API. It represents a contact form submission — the kind you'd find on a "Contact Me" page of a portfolio website.
Breakdown:
namespace PortfolioAPI.Models — organizes this class within the project, grouping it with other model classes.
*/
namespace PortfolioAPI.Models
{
    /*
    public class ContactMessage — defines a publicly accessible class. In an API context, this typically maps to a database table (if using an ORM like Entity Framework).
    */
    public class ContactMessage
    {
        /*
        Id — a unique integer identifier. ORMs like Entity Framework automatically treat a property named Id as the primary key.
        */
        public int Id { get; set; }
        /*
        Name, Email, Message — the core fields a user would fill in on a contact form. They're initialized to "" to avoid null reference issues.
        */
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";
        /*
        SentAt — a timestamp that automatically defaults to the current UTC time when a new object is created, so you don't have to set it manually.
        */
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        /*
        IsRead — a boolean flag to track whether the portfolio owner has read the message, defaulting to false.
        */
        public bool IsRead { get; set; } = false;
    }
}