using System.ComponentModel.DataAnnotations;

namespace Quiz_API.DTOs
{
    public class AnswerDTO
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
    }
}
