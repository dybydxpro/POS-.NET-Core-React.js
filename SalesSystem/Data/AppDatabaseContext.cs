using Microsoft.EntityFrameworkCore;
using SalesApp.Models;

namespace SalesSystem.Data
{
    public class AppDatabaseContext : DbContext
    {
        public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) : base(options)
        {

        }

        public DbSet<Sales> Sales { get; set; }
        public DbSet<SalesLines> SalesLines { get; set; }
    }
}
