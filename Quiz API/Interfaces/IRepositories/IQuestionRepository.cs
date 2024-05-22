using Quiz_API.Models;

namespace Quiz_API.Interfaces.IRepositories
{
    public interface IQuestionRepository
    {
        public Task<IEnumerable<Question>> GetAllByQuizIdAsync(Guid quizId);
        public Task<Question> GetByIdAsync(Guid id);
        public Task UpdateByIdAsync(Guid id, Question quiz);
        public Task AddAsync(Question quiz);
        public Task DeleteByIdAsync(Guid id);
        public Task DeleteAllByQuizIdAsync(Guid id);
    }
}
