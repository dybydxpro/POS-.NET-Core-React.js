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
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;

        public ItemController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetAllItems()
        {
            List<Item> items = _itemRepository.GetItems().ToList();
            return Ok(items);
        }

        [HttpGet("ASC")]
        public async Task<ActionResult<List<Item>>> GetAllItemsASC()
        {
            List<Item> items = _itemRepository.GetItemsASC().ToList();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetOnce(int id)
        {
            Item itm = _itemRepository.GetOnce(id);
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
            List<Item> items = _itemRepository.SearchItems(text).ToList();
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(ItemAddDTO obj)
        {
            if(ModelState.IsValid)
            {
                var isOK = _itemRepository.PostItems(obj);
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
                var isOK = _itemRepository.UpdateItems(obj);
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
