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
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepository;

        public StockController(IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<StockGetDTO>>> GetAllStocks()
        {
            List<StockGetDTO> stocks = _stockRepository.GetStocks().ToList();
            return Ok(stocks);
        }

        [HttpGet("ASC/{id}")]
        public async Task<ActionResult<List<Stock>>> GetStocksASC(int id)
        {
            List<Stock> stocks = _stockRepository.GetStocksASC(id).ToList();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StockGetDTO>> GetOnce(int id)
        {
            StockGetDTO stk = _stockRepository.GetOnce(id);
            if (stk.StockID != 0)
            {
                return Ok(stk);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<StockGetDTO>> SearchStock(string text)
        {
            List<StockGetDTO> stocks = _stockRepository.SearchStocks(text).ToList();
            return Ok(stocks);
        }

        [HttpPost]
        public async Task<ActionResult<Stock>> PostStock(StockAddDTO obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _stockRepository.PostStocks(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        public async Task<ActionResult<Stock>> EditStock(Stock obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _stockRepository.UpdateStocks(obj);
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
