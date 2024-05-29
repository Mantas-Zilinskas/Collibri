using Quiz_API.Interfaces.IRepositories;
using Quiz_API.Models;
using Quiz_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Quiz_API.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        private readonly QuizDbContext _context;

        public QuizRepository(QuizDbContext context)
        {
            _context = context;
        }

        async Task IQuizRepository.AddAsync(Quiz quiz)
        {

            await _context.Quizes.AddAsync(quiz);
            await _context.SaveChangesAsync();
        }

        async Task IQuizRepository.DeleteAllByRoomIdAsync(int id)
        {
            _context.Quizes.RemoveRange(await _context.Quizes.Where(quiz => quiz.RoomId == id).ToListAsync());
            await _context.SaveChangesAsync();
        }

        async Task IQuizRepository.DeleteByIdAsync(Guid id)
        {
            _context.Quizes.Remove(await _context.Quizes.FindAsync(id));
            await _context.SaveChangesAsync();
        }

        async Task<IEnumerable<Quiz>> IQuizRepository.GetAllByRoomIdAsync(int roomId)
        {
            IEnumerable<Quiz> quizes = await _context.Quizes.Where(quiz => quiz.RoomId == roomId).ToListAsync();

            return quizes;
        }

        async Task<Quiz> IQuizRepository.GetByIdAsync(Guid id)
        {
            return await _context.Quizes.FindAsync(id);
        }

        async Task IQuizRepository.UpdateByIdAsync(Guid id, Quiz quiz)
        {
            Quiz OldQuiz = await _context.Quizes.FindAsync(id);
            OldQuiz.Description = quiz.Description;
            OldQuiz.Name = quiz.Name;
            await _context.SaveChangesAsync();
            return;
        }
    }
}
