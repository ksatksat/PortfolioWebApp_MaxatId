//wanna know how this code works? follow the link below
//https://docs.google.com/document/d/1BzV_7jUcbPRQVe5-35KklzBHZ8YR9L3Q9iGJjj6TPB0/edit?tab=t.0
namespace PortfolioAPI.Models
{
    public class ContactMessage
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
    }
}