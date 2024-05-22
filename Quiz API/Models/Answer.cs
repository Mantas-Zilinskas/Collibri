using System.ComponentModel.DataAnnotations;

namespace Quiz_API.Models
{
    public class Answer
    {
        [Key]
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
    }
}
