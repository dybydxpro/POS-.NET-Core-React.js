using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_.NET_Core_React.js.Data;
using POS_.NET_Core_React.js.Models;
using POS_.NET_Core_React.js.Models.DTO;

namespace POS_.NET_Core_React.js.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        SupplierContext db = new SupplierContext();

        [HttpGet]
        public async Task<ActionResult<List<Supplier>>> GetAllStocks()
        {
            List<Supplier> stocks = db.GetSuppliers().ToList();
            return Ok(stocks);
        }

        [HttpGet("ASC")]
        public async Task<ActionResult<List<Supplier>>> GetSuppliersASC()
        {
            List<Supplier> stocks = db.GetSuppliersASC().ToList();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetOnce(int id)
        {
            Supplier stk = db.GetSupplierOnce(id);
            if (stk.SupplierID != 0)
            {
                return Ok(stk);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<Supplier>> SearchSupplier(string text)
        {
            List<Supplier> suppliers = db.SearchSuppliers(text).ToList();
            return Ok(suppliers);
        }

        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(SupplierAddDTO obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = db.PostSuppliers(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        public async Task<ActionResult<Supplier>> EditSupplier(Supplier obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = db.UpdateSuppliers(obj);
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
