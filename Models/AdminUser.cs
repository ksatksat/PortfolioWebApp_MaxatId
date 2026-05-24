//wanna know how this code works? follow the link below
//https://docs.google.com/document/d/1akVjtvetdb-WXSWeVMFGtkCOGOBCXs9rewUAreoiK60/edit?tab=t.0
namespace PortfolioAPI.Models
{
    public class AdminUser
    {
        public int Id { get; set; }
        public string PasswordHash { get; set; } = "";
    }
}