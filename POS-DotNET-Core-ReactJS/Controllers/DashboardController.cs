using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        DashboardContext db = new DashboardContext();

        [HttpGet("DailySales")]
        public async Task<ActionResult<List<DailySalesDashDTO>>> GetDailySales()
        {
            List<DailySalesDashDTO> dt = db.DailySales().ToList();
            return Ok(dt);
        }

        [HttpGet("MonthlySales")]
        public async Task<ActionResult<List<MonthlySalesDashDTO>>> GetMonthlySales()
        {
            List<MonthlySalesDashDTO> dt = db.MonthlySales().ToList();
            return Ok(dt);
        }

        [HttpGet("UserCounts")]
        public async Task<ActionResult<List<UserCountDTO>>> GetUserCounts()
        {
            List<UserCountDTO> dt = db.UserCounts().ToList();
            return Ok(dt);
        }

        [HttpGet("ItemCounts")]
        public async Task<ActionResult<List<int>>> GetItemCounts()
        {
            int dt = db.ItemCounts();
            return Ok(dt);
        }

        [HttpGet("SupplierCounts")]
        public async Task<ActionResult<List<int>>> GetSupplierCounts()
        {
            int dt = db.SuppliersCounts();
            return Ok(dt);
        }

        [HttpGet("GRNCounts")]
        public async Task<ActionResult<List<int>>> GetGRNCounts()
        {
            int dt = db.GRNCounts();
            return Ok(dt);
        }

        [HttpGet("DailyBillCounts")]
        public async Task<ActionResult<List<DailySalesDashDTO>>> GetDailyBillCount()
        {
            List<DailySalesDashDTO> dt = db.DailyBillCount().ToList();
            return Ok(dt);
        }

        [HttpGet("MonthlyBillCounts")]
        public async Task<ActionResult<List<MonthlySalesDashDTO>>> GetMonthlyBillCount()
        {
            List<MonthlySalesDashDTO> dt = db.MonthlyBillCount().ToList();
            return Ok(dt);
        }
    }
}
