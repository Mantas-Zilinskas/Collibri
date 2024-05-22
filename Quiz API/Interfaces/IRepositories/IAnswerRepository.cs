using Quiz_API.Models;

namespace Quiz_API.Interfaces.IRepositories
{
    public interface IAnswerRepository
    {
        public Task<IEnumerable<Answer>> GetAllByQuestionIdAsync(Guid questionId);
        public Task<Answer> GetByIdAsync(Guid id);
        public Task UpdateByIdAsync(Guid id, Answer answer);
        public Task AddAsync(Answer answer);
        public Task DeleteByIdAsync(Guid id);
        public Task DeleteAllByQuestionIdAsync(Guid id);
    }
}
