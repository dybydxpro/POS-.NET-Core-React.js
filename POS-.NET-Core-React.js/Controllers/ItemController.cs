using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_.NET_Core_React.js.Data;
using POS_.NET_Core_React.js.Models;
using POS_.NET_Core_React.js.Models.DTO;

namespace POS_.NET_Core_React.js.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        ItemContext db = new ItemContext();

        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetAllItems()
        {
            List<Item> items = db.GetItems().ToList();
            return Ok(items);
        }

        [HttpGet("ASC")]
        public async Task<ActionResult<List<Item>>> GetAllItemsASC()
        {
            List<Item> items = db.GetItemsASC().ToList();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetOnce(int id)
        {
            Item itm = db.GetOnce(id);
            if(itm.ItemID != 0)
            {
                return Ok(itm); 
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<Item>> SearchItem(string text)
        {
            List<Item> items = db.SearchItems(text).ToList();
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(ItemAddDTO obj)
        {
            if(ModelState.IsValid)
            {
                var isOK = db.PostItems(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<Item>> EditItem(Item obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = db.UpdateItems(obj);
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
