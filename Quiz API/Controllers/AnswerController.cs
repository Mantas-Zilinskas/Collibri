using Microsoft.AspNetCore.Mvc;
using Quiz_API.DTOs;
using Quiz_API.Interfaces.IRepositories;
using Quiz_API.Interfaces.IServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Quiz_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAnswerRepository _answerRepository;
        public AnswerController(IAnswerRepository answerRepository, IMapper mapper)
        {
            _answerRepository = answerRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllByQuestionId/{id}")]
        public async Task<IActionResult> GetAllByQuestionId(Guid id)
        {
            return Ok(_mapper.MapToDTO(await _answerRepository.GetAllByQuestionIdAsync(id)));
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            return Ok(_mapper.MapToDTO(await _answerRepository.GetByIdAsync(id)));
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddAsync([FromBody] AnswerDTO answer)
        {
            await _answerRepository.AddAsync(_mapper.MapFromDTO(answer));
            return Ok();
        }

        [HttpPut("UpdateById/{id}")]
        public async Task<IActionResult> UpdateByIdAsync(Guid id, [FromBody] AnswerDTO answer)
        {
            await _answerRepository.UpdateByIdAsync(id, _mapper.MapFromDTO(answer));
            return Ok();
        }

        [HttpDelete("DeleteAllByQuestionId{id}")]
        public async Task<IActionResult> DeleteAllByQuestionId(Guid id)
        {
            await _answerRepository.DeleteAllByQuestionIdAsync(id);
            return Ok();
        }

        [HttpDelete("DeleteById{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _answerRepository.DeleteByIdAsync(id);
            return Ok();
        }
    }
}
