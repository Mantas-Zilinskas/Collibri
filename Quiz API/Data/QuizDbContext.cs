using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Quiz_API.Models;

namespace Quiz_API.Data
{
    public class QuizDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public QuizDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("QuizServer"));
        }

        public DbSet<Quiz> Quizes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
    }
}
