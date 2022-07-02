using Microsoft.AspNetCore.Mvc;

namespace SalesSystem.Controllers
{
    public class SaleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Add()
        {
            return View();
        }


    }
}
