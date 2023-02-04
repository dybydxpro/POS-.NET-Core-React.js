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
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Cart>>> GetAllCarts(int id)
        {
            List<CartGetDTO> grn = _cartRepository.GetCarts(id).ToList();
            return Ok(grn);
        }

        [HttpGet("GetSingle/{id}")]
        public async Task<ActionResult<Cart>> GetSingle(int id)
        {
            CartGetDTO cart = _cartRepository.GetCartOnce(id);
            if(cart.CartID == 0)
            {
                return NotFound();
            }
            else
            {
                return Ok(cart);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(CartAddDTO obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _cartRepository.PostCarts(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<Cart>> EditCart(Cart obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _cartRepository.EditCarts(obj);
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
        public async Task<ActionResult<Cart>> DeleteCart(int id)
        {
            if (ModelState.IsValid)
            {
                var isOK = _cartRepository.DeleteCarts(id);
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
