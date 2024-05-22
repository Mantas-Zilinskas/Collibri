using Microsoft.AspNetCore.Mvc;
using Quiz_API.DTOs;
using Quiz_API.Interfaces.IRepositories;
using Quiz_API.Interfaces.IServices;
using Quiz_API.Models;
using Quiz_API.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Quiz_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IQuestionRepository _questionRepository;
        public QuestionController(IQuestionRepository questionRepository, IMapper mapper)
        {
            _questionRepository = questionRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllByQuizId/{id}")]
        public async Task<IActionResult> GetAllByQuizId(Guid id)
        {
            return Ok(_mapper.MapToDTO(await _questionRepository.GetAllByQuizIdAsync(id)));
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            return Ok(_mapper.MapToDTO(await _questionRepository.GetByIdAsync(id)));
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddAsync([FromBody] QuestionDTO question)
        {
            await _questionRepository.AddAsync(_mapper.MapFromDTO(question));
            return Ok();
        }

        [HttpPut("UpdateById/{id}")]
        public async Task<IActionResult> UpdateByIdAsync(Guid id, [FromBody] QuestionDTO question)
        {
            await _questionRepository.UpdateByIdAsync(id, _mapper.MapFromDTO(question));
            return Ok();
        }

        [HttpDelete("DeleteAllByQuizId{id}")]
        public async Task<IActionResult> DeleteAllByQuizId(Guid id)
        {
            await _questionRepository.DeleteAllByQuizIdAsync(id);
            return Ok();
        }

        [HttpDelete("DeleteById{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _questionRepository.DeleteByIdAsync(id);
            return Ok();
        }
    }
}
