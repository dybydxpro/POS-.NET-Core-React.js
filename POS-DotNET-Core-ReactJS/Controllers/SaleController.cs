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
    public class SaleController : ControllerBase
    {
        private readonly ISaleRepository _saleRepository;
        private readonly ICartRepository _cartRepository;
        public SaleController(ISaleRepository saleRepository, ICartRepository cartRepository)
        {
            _saleRepository = saleRepository;
            _cartRepository = cartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Sale>>> GetAllSales()
        {
            List<SaleGetDTO> sale = _saleRepository.GetSales().ToList();
            return Ok(sale);
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<List<Sale>>> GetSearchSales(string text)
        {
            List<SaleGetDTO> sale = _saleRepository.GetSearchSales(text).ToList();
            return Ok(sale);
        }

        [HttpGet("Bill/{billid}")]
        public async Task<ActionResult<Sale>> GetBill(int billid)
        {
            List<SaleGetOneDTO> sale = _saleRepository.GetBill(billid).ToList();
            return Ok(sale);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSingle(int id)
        {
            SaleGetOneDTO sale = _saleRepository.GetSaleOnce(id);
            return Ok(sale);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Cart>> PostSale(int id)
        {
            if (ModelState.IsValid)
            {
                List<CartGetDTO> carts = _cartRepository.GetCarts(id).ToList();

                int maxID = Convert.ToInt32(_saleRepository.GetMaxIDSeles()) + 1;
                DateTime dtm = DateTime.Now;

                foreach (CartGetDTO ch in carts)
                {
                    SaleAddInDTO sadto = new SaleAddInDTO();
                    sadto.BillNo = maxID;
                    sadto.ItemID = ch.ItemID;
                    sadto.StockID = ch.StockID;
                    sadto.SoldQty = ch.CartQty;
                    sadto.SoldPrice = ch.NetPrice;
                    sadto.SellerID = ch.SellerID;
                    sadto.Timescape = dtm;

                    _saleRepository.PostSales(sadto);
                    _cartRepository.DeleteCarts(ch.CartID);
                }
                return Ok(maxID);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
