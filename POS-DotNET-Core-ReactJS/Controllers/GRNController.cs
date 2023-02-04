using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models.DTO;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;

namespace POS_DotNET_Core_ReactJS.Controllers
{
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
            List<GRNCartGetDTO> grns = _GRNCartRepository.GetGRNCarts(id).ToList();

            int maxID = _GRNRepository.GetMaxIDGRNs() + 1;
            DateTime dtm = DateTime.Now;

            foreach (GRNCartGetDTO ch in grns)
            {
                GRNAddDTO gadto = new GRNAddDTO();
                gadto.GRNNo = maxID;
                gadto.GRNDate = dtm;
                gadto.InvoiceNo = ch.InvoiceNo;
                gadto.InvoiceDate = ch.InvoiceDate;
                gadto.SupplierID = ch.SupplierID;
                gadto.ItemID = ch.ItemID;
                gadto.StockID = ch.StockID;
                gadto.GRNQty = ch.GRNQty;
                gadto.PayType = ch.PayType;
                gadto.BulckPrice = ch.BulckPrice;
                gadto.ActualBulkPrice = ch.ActualBulkPrice;
                gadto.GRNRecorderID = id;
                gadto.DueDate = ch.DueDate;
                gadto.Remarks = ch.Remarks;

                _GRNRepository.PostGRNs(gadto);
                _GRNCartRepository.DeleteGRNCarts(ch.GRNID);
            }
            return Ok();
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
