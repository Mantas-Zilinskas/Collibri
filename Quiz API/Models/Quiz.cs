using System.ComponentModel.DataAnnotations;

namespace Quiz_API.Models
{
    public class Quiz
    {
        [Key]
        public Guid Id { get; set; }
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Question> questions { get; set; }
    }
}
