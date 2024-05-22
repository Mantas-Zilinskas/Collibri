using System.ComponentModel.DataAnnotations;

namespace Quiz_API.DTOs
{
    public class QuizDTO
    {
        [Key]
        public Guid Id { get; set; }
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
