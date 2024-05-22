using Microsoft.EntityFrameworkCore;
using Quiz_API.Data;
using Quiz_API.Interfaces.IRepositories;
using Quiz_API.Models;

namespace Quiz_API.Repositories
{
    public class AnswerRepository : IAnswerRepository
    {

        private readonly QuizDbContext _context;

        public AnswerRepository(QuizDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Answer answer)
        {
            await _context.Answers.AddAsync(answer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAllByQuestionIdAsync(Guid id)
        {
            _context.Answers.RemoveRange(await _context.Answers.Where(answer => answer.QuestionId == id).ToListAsync());
            await _context.SaveChangesAsync();
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            Answer answer = await _context.Answers.FindAsync(id);
            if (answer != null)
            {
                _context.Answers.Remove(answer);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Answer>> GetAllByQuestionIdAsync(Guid questionId)
        {
            return await _context.Answers.Where(answer => answer.QuestionId == questionId).ToListAsync();
        }

        public async Task<Answer> GetByIdAsync(Guid id)
        {
            return await _context.Answers.FindAsync(id);
        }

        public async Task UpdateByIdAsync(Guid id, Answer answer)
        {
            Answer OldAnswer = await _context.Answers.FindAsync(id);
            if (OldAnswer != null)
            {
                OldAnswer.QuestionId = answer.QuestionId;
                OldAnswer.AnswerText = answer.AnswerText;
                OldAnswer.IsCorrect = answer.IsCorrect;
                await _context.SaveChangesAsync();
            }
            else
            {
                await _context.Answers.AddAsync(answer);
                await _context.SaveChangesAsync();
            }
        }
    }
}
