using Quiz_API.Models;
using Quiz_API.DTOs;
using Quiz_API.Interfaces.IServices;

namespace Quiz_API.Services
{
    public class Mapper : IMapper
    {
        public IEnumerable<Quiz> MapFromDTO(IEnumerable<QuizDTO> DTOs)
        {
            if (DTOs == null) return null;
            IEnumerable<Quiz> Quizzes = DTOs.Select(DTO => new Quiz()
            {
                Id = DTO.Id,
                Name = DTO.Name,
                RoomId = DTO.RoomId,
                Description = DTO.Description,
                questions = null
            }).ToArray();

            return Quizzes;
        }

        public Quiz MapFromDTO(QuizDTO DTO)
        {
            if (DTO == null) return null;
            Quiz quiz = new Quiz()
            {
                Id = DTO.Id,
                Name = DTO.Name,
                RoomId = DTO.RoomId,
                Description = DTO.Description,
                questions = null
            };

            return quiz;
        }

        public IEnumerable<Question> MapFromDTO(IEnumerable<QuestionDTO> DTOs)
        {
            if (DTOs == null) return null;
            IEnumerable<Question> Questions = DTOs.Select(DTO => new Question()
            {
                Id = DTO.Id,
                Name = DTO.Name,
                QuizId = DTO.QuizId,
                QuestionText = DTO.QuestionText,
                Type = DTO.Type,
                answers = null
            }).ToArray();

            return Questions;
        }

        public Question MapFromDTO(QuestionDTO DTO)
        {
            if (DTO == null) return null;
            Question question = new Question()
            {
                Id = DTO.Id,
                Name = DTO.Name,
                QuizId = DTO.QuizId,
                QuestionText = DTO.QuestionText,
                Type = DTO.Type,
                answers = null
            };

            return question;
        }

        public IEnumerable<Answer> MapFromDTO(IEnumerable<AnswerDTO> DTOs)
        {
            if (DTOs == null) return null;
            IEnumerable<Answer> answers = DTOs.Select(DTO => new Answer()
            {
                Id = DTO.Id,
                QuestionId = DTO.QuestionId,
                AnswerText = DTO.AnswerText,
                IsCorrect = DTO.IsCorrect,
            }).ToArray();

            return answers;
        }

        public Answer MapFromDTO(AnswerDTO DTO)
        {
            if (DTO == null) return null;
            Answer answer = new Answer()
            {
                Id = DTO.Id,
                QuestionId = DTO.QuestionId,
                AnswerText = DTO.AnswerText,
                IsCorrect = DTO.IsCorrect,
            };

            return answer;
        }

        public IEnumerable<QuizDTO> MapToDTO(IEnumerable<Quiz> quizes) 
        {
            if (quizes == null) return null;
            IEnumerable<QuizDTO> DTOs = quizes.Select(quiz => new QuizDTO()
            {
                Id = quiz.Id,
                Name = quiz.Name,
                RoomId = quiz.RoomId,
                Description = quiz.Description,
            }).ToArray();
                
            return DTOs;
            
        }

        public QuizDTO MapToDTO(Quiz quiz)
        {
            if (quiz == null) return null;
            QuizDTO DTO = new QuizDTO()
            {
                Id = quiz.Id,
                Name = quiz.Name,
                RoomId = quiz.RoomId,
                Description = quiz.Description,
            };

            return DTO;

        }

        public IEnumerable<QuestionDTO> MapToDTO(IEnumerable<Question> questions)
        {
            if (questions == null) return null;
            IEnumerable<QuestionDTO> DTOs = questions.Select(question => new QuestionDTO()
            {
                Id = question.Id,
                Name = question.Name,
                QuizId = question.QuizId,
                QuestionText = question.QuestionText,
                Type = question.Type
            }).ToArray();

            return DTOs;
        }

        public QuestionDTO MapToDTO(Question question)
        {
            if (question == null) return null;
            QuestionDTO DTO = new QuestionDTO()
            {
                Id = question.Id,
                Name = question.Name,
                QuizId = question.QuizId,
                QuestionText = question.QuestionText,
                Type = question.Type
            };

            return DTO;
        }

        public IEnumerable<AnswerDTO> MapToDTO(IEnumerable<Answer> answers)
        {
            if (answers == null) return null;
            IEnumerable<AnswerDTO> DTOs = answers.Select(answer => new AnswerDTO()
            {
                Id = answer.Id,
                QuestionId = answer.QuestionId,
                AnswerText = answer.AnswerText,
                IsCorrect = answer.IsCorrect,
            }).ToArray();

            return DTOs;
        }

        public AnswerDTO MapToDTO(Answer answer)
        {
            if (answer == null) return null;
            AnswerDTO DTO = new AnswerDTO()
            {
                Id = answer.Id,
                QuestionId = answer.QuestionId,
                AnswerText = answer.AnswerText,
                IsCorrect = answer.IsCorrect,
            };

            return DTO;
        }
    }
}
