using System.ComponentModel.DataAnnotations;

namespace Quiz_API.DTOs
{
    public class QuestionDTO
    {
        [Key]
        public Guid Id { get; set; }
        public Guid QuizId { get; set; }
        public string Name { get; set; }
        public string QuestionText { get; set; }
        public int Type { get; set; }

    }
}
