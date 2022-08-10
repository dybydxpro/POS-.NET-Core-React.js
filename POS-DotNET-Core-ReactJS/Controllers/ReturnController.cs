using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;

namespace POS_DotNET_Core_ReactJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReturnController : ControllerBase
    {
        private readonly IReturnRepository _returnRepository;

        public ReturnController(IReturnRepository returnRepository)
        {
            _returnRepository = returnRepository;
        }   

        [HttpGet]
        public async Task<ActionResult<List<ReturnItem>>> GetAllItems()
        {
            List<ReturnItemGetDTO> ri = _returnRepository.GetReturn().ToList();
            return Ok(ri);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReturnItem>> GetOnce(int id)
        {
            ReturnItemGetDTO ri = _returnRepository.GetOnce(id);
            if (ri.ReturnID != 0)
            {
                return Ok(ri);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<ReturnItem>> SearchReturn(string text)
        {
            List<ReturnItemGetDTO> ri = _returnRepository.GetReturn(text).ToList();
            return Ok(ri);
        }

        [HttpPost]
        public async Task<ActionResult<ReturnItem>> PostReturn(ReturnItemCreateDTO obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _returnRepository.PostReturn(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<ReturnItem>> EditReturn(ReturnItem obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _returnRepository.UpdateReturn(obj);
                if (isOK)
                {
                    return Ok(isOK);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ReturnItem>> DeleteReturn(int id)
        {
            if (ModelState.IsValid)
            {
                var isOK = _returnRepository.DeleteReturn(id);
                if (isOK)
                {
                    return Ok(isOK);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
