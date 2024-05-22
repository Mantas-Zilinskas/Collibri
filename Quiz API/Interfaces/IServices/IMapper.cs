using Quiz_API.Models;
using Quiz_API.DTOs;


namespace Quiz_API.Interfaces.IServices
{
    public interface IMapper
    {
        public IEnumerable<QuizDTO> MapToDTO(IEnumerable<Quiz> quiz);
        public QuizDTO MapToDTO(Quiz quiz);
        public IEnumerable<Quiz> MapFromDTO(IEnumerable<QuizDTO> quiz);
        public Quiz MapFromDTO(QuizDTO quiz);
        public IEnumerable<QuestionDTO> MapToDTO(IEnumerable<Question> questions);
        public QuestionDTO MapToDTO(Question question);
        public IEnumerable<Question> MapFromDTO(IEnumerable<QuestionDTO> questions);
        public Question MapFromDTO(QuestionDTO question);
        public IEnumerable<AnswerDTO> MapToDTO(IEnumerable<Answer> answers);
        public AnswerDTO MapToDTO(Answer answer);
        public IEnumerable<Answer> MapFromDTO(IEnumerable<AnswerDTO> answers);
        public Answer MapFromDTO(AnswerDTO answer);
    }
}
