using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models.DTO;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;

namespace POS_DotNET_Core_ReactJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardController(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        [HttpGet("DailySales")]
        public async Task<ActionResult<List<DailySalesDashDTO>>> GetDailySales()
        {
            List<DailySalesDashDTO> dt = _dashboardRepository.DailySales().ToList();
            return Ok(dt);
        }

        [HttpGet("MonthlySales")]
        public async Task<ActionResult<List<MonthlySalesDashDTO>>> GetMonthlySales()
        {
            List<MonthlySalesDashDTO> dt = _dashboardRepository.MonthlySales().ToList();
            return Ok(dt);
        }

        [HttpGet("UserCounts")]
        public async Task<ActionResult<List<UserCountDTO>>> GetUserCounts()
        {
            List<UserCountDTO> dt = _dashboardRepository.UserCounts().ToList();
            return Ok(dt);
        }

        [HttpGet("ItemCounts")]
        public async Task<ActionResult<List<int>>> GetItemCounts()
        {
            int dt = _dashboardRepository.ItemCounts();
            return Ok(dt);
        }

        [HttpGet("SupplierCounts")]
        public async Task<ActionResult<List<int>>> GetSupplierCounts()
        {
            int dt = _dashboardRepository.SuppliersCounts();
            return Ok(dt);
        }

        [HttpGet("GRNCounts")]
        public async Task<ActionResult<List<int>>> GetGRNCounts()
        {
            int dt = _dashboardRepository.GRNCounts();
            return Ok(dt);
        }

        [HttpGet("DailyBillCounts")]
        public async Task<ActionResult<List<DailySalesDashDTO>>> GetDailyBillCount()
        {
            List<DailySalesDashDTO> dt = _dashboardRepository.DailyBillCount().ToList();
            return Ok(dt);
        }

        [HttpGet("MonthlyBillCounts")]
        public async Task<ActionResult<List<MonthlySalesDashDTO>>> GetMonthlyBillCount()
        {
            List<MonthlySalesDashDTO> dt = _dashboardRepository.MonthlyBillCount().ToList();
            return Ok(dt);
        }
    }
}
