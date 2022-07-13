﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_.NET_Core_React.js.Data;
using POS_.NET_Core_React.js.Models;
using POS_.NET_Core_React.js.Models.DTO;

namespace POS_.NET_Core_React.js.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        SaleContext db = new SaleContext();
        CartContext cdb = new CartContext();

        [HttpGet]
        public async Task<ActionResult<List<Sale>>> GetAllSales(int id)
        {
            List<SaleGetDTO> sale = db.GetSales().ToList();
            return Ok(sale);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSingle(int id)
        {
            SaleGetOneDTO sale = db.GetSaleOnce(id);
            return Ok(sale);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Cart>> PostSale(int id)
        {
            if (ModelState.IsValid)
            {
                List<CartGetDTO> carts = cdb.GetCarts(id).ToList();

                int maxID = Convert.ToInt32(db.GetMaxIDSeles()) + 1;
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

                    db.PostSales(sadto);
                    cdb.DeleteCarts(ch.CartID);
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