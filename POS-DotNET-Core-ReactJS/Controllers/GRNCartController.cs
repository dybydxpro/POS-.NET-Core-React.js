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
    public class GRNCartController : ControllerBase
    {
        private readonly IStockRepository _stockRepository;
        private readonly IGRNCartRepository _GRNCartRepository;

        public GRNCartController(IStockRepository stockRepository, IGRNCartRepository gRNCartRepository)
        {
            _stockRepository = stockRepository;
            _GRNCartRepository = gRNCartRepository;
        }

        [HttpGet("GetByUser/{id}")]
        public async Task<ActionResult<List<GRNCartGetDTO>>> GetAllGRNCarts(int id)
        {
            List<GRNCartGetDTO> grns = _GRNCartRepository.GetGRNCarts(id).ToList();
            return Ok(grns);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GRNCart>> GetOnceGRNCart(int id)
        {
            GRNCart grn = _GRNCartRepository.GetOnceGRNCart(id);
            if (grn.GRNID != 0)
            {
                return Ok(grn);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<GRNCart>> PostGRNCart(GRNCartAddDTO obj)
        {
            if (ModelState.IsValid)
            {
                var vals = _stockRepository.GetOnce(obj.StockID);
                obj.ActualBulkPrice = obj.GRNQty * vals.Price;
                var isOK = _GRNCartRepository.PostGRNCarts(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        public async Task<ActionResult<GRNCart>> EditGRNCart(GRNCart obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _GRNCartRepository.UpdateGRNCarts(obj);
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
        public async Task<ActionResult<GRNCart>> DeleteGRNCart(int id)
        {
            if (ModelState.IsValid)
            {
                var isOK = _GRNCartRepository.DeleteGRNCarts(id);
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
