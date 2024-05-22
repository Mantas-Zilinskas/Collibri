using Quiz_API.DTOs;
using Quiz_API.Models;

namespace Quiz_API.Interfaces.IRepositories
{ 
    public interface IQuizRepository
    {
        public Task<IEnumerable<Quiz>> GetAllByRoomIdAsync(int roomId);
        public Task<Quiz> GetByIdAsync(Guid id);
        public Task UpdateByIdAsync(Guid id,Quiz quiz);
        public Task AddAsync(Quiz quiz);
        public Task DeleteByIdAsync(Guid id);
        public Task DeleteAllByRoomIdAsync(int id);
    }
}
