using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;
using Quiz_API.DTOs;

namespace Collibri.Tests.IntegrationTests
{
    public class QuizControllerIntegrationTests : IClassFixture<QuizCustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public QuizControllerIntegrationTests(QuizCustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetAllByRoomId_ReturnsSuccessAndCorrectContentType()
        {
            var roomId = 1;
            var response = await _client.GetAsync($"/api/Quiz/GetAllByRoomId/{roomId}");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task CreateQuiz_ReturnsOkWithCreatedQuiz()
        {
            var quizDto = new QuizDTO
            {
                Id = Guid.NewGuid(),
                RoomId = 1,
                Name = "Test Quiz",
                Description = "This is a test quiz."
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(quizDto), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/Quiz/Add", jsonContent);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task CreateQuiz_ReturnsBadRequest()
        {
            var quizDto = new
            {
                Id = Guid.NewGuid(),
                RoomId = 1,
                Name = "Test Quiz"
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(quizDto), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/Quiz/Add", jsonContent);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task DeleteQuiz_ReturnsOk()
        {
            // Ensure to add a quiz first before deleting to avoid NotFound error
            var quizDto = new QuizDTO
            {
                Id = Guid.NewGuid(),
                RoomId = 1,
                Name = "Test Quiz",
                Description = "This is a test quiz."
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(quizDto), Encoding.UTF8, "application/json");
            await _client.PostAsync("/api/Quiz/Add", jsonContent);

            var response = await _client.DeleteAsync($"/api/Quiz/DeleteById/{quizDto.Id}");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

       
    }
}
