using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_.NET_Core_React.js.Data;
using POS_.NET_Core_React.js.Models;
using POS_.NET_Core_React.js.Models.DTO;

namespace POS_.NET_Core_React.js.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        StockContext db = new StockContext();

        [HttpGet]
        public async Task<ActionResult<List<StockGetDTO>>> GetAllStocks()
        {
            List<StockGetDTO> stocks = db.GetStocks().ToList();
            return Ok(stocks);
        }

        [HttpGet("ASC/{id}")]
        public async Task<ActionResult<List<Stock>>> GetStocksASC(int id)
        {
            List<Stock> stocks = db.GetStocksASC(id).ToList();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StockGetDTO>> GetOnce(int id)
        {
            StockGetDTO stk = db.GetOnce(id);
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
            List<StockGetDTO> stocks = db.SearchStocks(text).ToList();
            return Ok(stocks);
        }

        [HttpPost]
        public async Task<ActionResult<Stock>> PostStock(StockAddDTO obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = db.PostStocks(obj);
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
                var isOK = db.UpdateStocks(obj);
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
