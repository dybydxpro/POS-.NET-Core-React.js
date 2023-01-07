using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;

namespace POS_DotNET_Core_ReactJS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GRNController : ControllerBase
    {
        private readonly IGRNRepository _GRNRepository;
        private readonly IGRNCartRepository _GRNCartRepository;

        public GRNController(IGRNRepository gRNRepository, IGRNCartRepository gRNCartRepository)
        {
            _GRNRepository = gRNRepository;
            _GRNCartRepository = gRNCartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<GRNAllDTO>>> GetAllStocks()
        {
            List<GRNAllDTO> grn = _GRNRepository.GetGRNs().ToList();
            return Ok(grn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GRNGetOneDTO>> GetOnce(int id)
        {
            List<GRNGetOneDTO> stk = _GRNRepository.GetGRNOnce(id).ToList();
            return Ok(stk);
        }

        [HttpGet("GetSingle/{id}")]
        public async Task<ActionResult<GRNEditDTO>> GetSingle(int id)
        {
            GRNEditDTO stk = _GRNRepository.GetOneByIDGRNs(id);
            return Ok(stk);
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<GRNAllDTO>> SearchGRN(string text)
        {
            List<GRNAllDTO> grns = _GRNRepository.SearchGRNs(text).ToList();
            return Ok(grns);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<GRNAllDTO>> PostGRN(int id)
        {
            bool temp = _GRNRepository.PostAllGRNs(id);
            if (temp)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<GRNEditDTO>> EditStock(GRNEditDTO obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _GRNRepository.EditGRNs(obj);
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
