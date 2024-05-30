using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using Quiz_API.Data;
using Microsoft.Extensions.Configuration;

namespace Collibri.Tests.IntegrationTests
{
    public class QuizCustomWebApplicationFactory : WebApplicationFactory<Quiz_API.Program>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<QuizDbContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<QuizDbContext>(options =>
                {
                    options.UseNpgsql(context.Configuration.GetConnectionString("QuizServer"));
                });

                var sp = services.BuildServiceProvider();

                using var scope = sp.CreateScope();
                var scopedServices = scope.ServiceProvider;
                var db = scopedServices.GetRequiredService<QuizDbContext>();

                db.Database.EnsureCreated();
            });
        }
    }
}
