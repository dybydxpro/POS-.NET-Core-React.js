using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Models.DTO;

namespace POS_DotNET_Core_ReactJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserContext db = new UserContext();

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers(){
            List<User> users = db.GetUser().ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> GetAllUsers(int id)
        {
            UserEdit users = db.GetUserOnce(id);
            return Ok(users);
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<List<User>>> SearchUsers(string text)
        {
            List<User> users = db.SearchUser(text).ToList();
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> CreateUser(User user)
        {
            if (ModelState.IsValid)
            {
                var isOK = db.AddUsers(user);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("ActiveAccount/{id}")]
        public async Task<ActionResult<List<User>>> ActiveDeactivateAccount(int id)
        {
            if (ModelState.IsValid)
            {
                var isOK = db.ActiveDeactiveUser(id);
                return Ok(isOK);
            }
            else
            {
                return BadRequest("Something Wrong!");
            }
        }

        [HttpPut("EditUser")]
        public async Task<ActionResult<List<User>>> EditUser(UserEdit obj)
        {
            if (ModelState.IsValid)
            {
                if (db.EditUser(obj))
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest("Something Wrong!");
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult<List<UserAccountDTO>>> Login(LoginDTO obj)
        {
            if (ModelState.IsValid)
            {
                var data = db.Login(obj.UserName, obj.Password);
                if(data.UserID == 0)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(data);
                }
            }
            else
            {
                return BadRequest("Something Wrong!");
            }
        }

        [HttpPut("ResetPassword")]
        public async Task<ActionResult<List<User>>> ResetPassword(ResetPwDTO obj)
        {
            if (ModelState.IsValid)
            {
                var data = db.ChangePassword(obj.UserID, obj.Password);
                return Ok(data);
            }
            else
            {
                return BadRequest("Something Wrong!");
            }
        }
    }
}
