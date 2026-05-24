//wana know how this code works? follow the link below
//https://docs.google.com/document/d/1fYSI3tXTQp2W6_BAxVl9c5HJzp_QIX10YIo6-i2ehAY/edit?tab=t.0
namespace PortfolioAPI.Models
{
    public class VisitorsCount
    {
        public int Id { get; set; }
        public int Count { get; set; } = 0;
    }
}
/*
The big picture — this is almost certainly an Entity Framework model (an ORM for .NET). It maps to a database table called something like VisitorsCounts, with two columns: Id and Count. It's used in a portfolio web API to persist and retrieve how many visitors have viewed the site.
A typical usage flow would be:

First visit → create a VisitorsCount record with Count = 1
Each subsequent visit → fetch the record and increment Count
The API exposes an endpoint to read or update that count
*/
/*
namespace PortfolioAPI.Models — this organizes the class within the PortfolioAPI project, under a Models folder/group. Namespaces prevent naming conflicts and keep code organized.
So if I have namespace SomeNS.Folder1, and I have class called Unit with property called Name, And I have namespace  SomeNS.Folder2, and I have class called Unit with property called Name,  is it OK with names of classes and properties ?
Yes, it's completely fine! That's actually one of the main purposes of namespaces — to avoid naming conflicts.
Even though both classes have the same name Unit with the same property Name, they are considered entirely different types because they live in different namespaces:
SomeNS.Folder1.Unit  // ← this is one type
SomeNS.Folder2.Unit  // ← this is a completely different type
When there's no conflict (you're only using one of them in a file), you can just write:
csharpusing SomeNS.Folder1;

var u = new Unit(); // unambiguous, refers to Folder1's Unit
When both are used in the same file, you just fully qualify the name to tell C# which one you mean:
csharpvar u1 = new SomeNS.Folder1.Unit();
var u2 = new SomeNS.Folder2.Unit();
Or you can use aliases to keep it clean:
csharpusing Unit1 = SomeNS.Folder1.Unit;
using Unit2 = SomeNS.Folder2.Unit;

var u1 = new Unit1();
var u2 = new Unit2();
So namespaces essentially act as a last name for your classes — two people can share the first name "John", but "John Smith" and "John Doe" are different people.
*/