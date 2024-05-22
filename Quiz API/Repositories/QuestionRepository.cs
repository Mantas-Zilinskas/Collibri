using Microsoft.EntityFrameworkCore;
using Quiz_API.Data;
using Quiz_API.Interfaces.IRepositories;
using Quiz_API.Models;

namespace Quiz_API.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {

        private readonly QuizDbContext _context;

        public QuestionRepository(QuizDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Question quiz)
        {
            await _context.Questions.AddAsync(quiz);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAllByQuizIdAsync(Guid id)
        {
            _context.Questions.RemoveRange(await _context.Questions.Where(question => question.QuizId == id).ToListAsync());
            await _context.SaveChangesAsync();
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            Question question = await _context.Questions.FindAsync(id);
            if (question != null)
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Question>> GetAllByQuizIdAsync(Guid quizId)
        {
            IEnumerable<Question> questions = await _context.Questions.Where(question => question.QuizId == quizId).ToListAsync();

            return questions;
        }

        public async Task<Question> GetByIdAsync(Guid id)
        {
            return await _context.Questions.FindAsync(id);
        }

        public async Task UpdateByIdAsync(Guid id, Question question)
        {
            Question OldQuestion = await _context.Questions.FindAsync(id);
            if (OldQuestion != null)
            {
                OldQuestion.Name = question.Name;
                OldQuestion.QuestionText = question.QuestionText;
                OldQuestion.Type = question.Type;
                await _context.SaveChangesAsync();
            }
            else 
            {
                await _context.Questions.AddAsync(question);
                await _context.SaveChangesAsync();
            }

            return;
        }
    }
}
