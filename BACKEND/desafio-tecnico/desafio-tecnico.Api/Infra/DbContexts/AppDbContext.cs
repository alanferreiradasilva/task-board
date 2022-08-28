using desafio_tecnico.Api.Abstractions.Entities;
using Microsoft.EntityFrameworkCore;

namespace desafio_tecnico.Api.Infra.DbContexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Card> Cards { get; set; }
    }
}
