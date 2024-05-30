using Microsoft.AspNetCore.Mvc;
using Quiz_API.DTOs;
using Quiz_API.Interfaces.IRepositories;
using Quiz_API.Interfaces.IServices;
using System;
using System.Threading.Tasks;

namespace Quiz_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizRepository _quizRepository;
        private readonly IMapper _mapper;
        public QuizController(IQuizRepository quizRepository, IMapper mapper)
        {
            _quizRepository = quizRepository;
            _mapper = mapper;
        }


        [HttpGet("GetAllByRoomId/{id}")]
        public async Task<IActionResult> GetAllByRoomId(int id)
        {
            return Ok(_mapper.MapToDTO(await _quizRepository.GetAllByRoomIdAsync(id)));
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            return Ok(_mapper.MapToDTO(await _quizRepository.GetByIdAsync(id)));
        }
        [HttpPost("Add")]
        public async Task<IActionResult> AddAsync([FromBody] QuizDTO quiz)
        {
            await _quizRepository.AddAsync(_mapper.MapFromDTO(quiz));
            return Ok();
        }

        [HttpPut("UpdateById/{id}")]
        public async Task<IActionResult> UpdateByIdAsync(Guid id, [FromBody] QuizDTO quiz)
        {
            await _quizRepository.UpdateByIdAsync(id, _mapper.MapFromDTO(quiz));
            return Ok();
        }

        [HttpDelete("DeleteAllByRoomId/{id}")]
        public async Task<IActionResult> DeleteAllByRoomId(int id)
        {
            await _quizRepository.DeleteAllByRoomIdAsync(id);
            return Ok();
        }
        [HttpDelete("DeleteById/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _quizRepository.DeleteByIdAsync(id);
            return Ok();
        }
    }
}
