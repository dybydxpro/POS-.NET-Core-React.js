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
    }
}
