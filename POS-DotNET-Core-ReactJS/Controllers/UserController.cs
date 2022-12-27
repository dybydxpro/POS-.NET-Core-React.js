using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Repository.Classes;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;

namespace POS_DotNET_Core_ReactJS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthRepository _authRepository;

        public UserController(IUserRepository userRepository, IAuthRepository authRepository)
        {
            _userRepository = userRepository;
            _authRepository = authRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers(){
            List<User> users = _userRepository.GetUser().ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> GetAllUsers(int id)
        {
            UserEdit users = _userRepository.GetUserOnce(id);
            return Ok(users);
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<List<User>>> SearchUsers(string text)
        {
            List<User> users = _userRepository.SearchUser(text).ToList();
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> CreateUser(UserAdd user)
        {
            if (ModelState.IsValid)
            {
                var isOK = _userRepository.AddUsers(user);
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
                var isOK = _userRepository.ActiveDeactiveUser(id);
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
                if (_userRepository.EditUser(obj))
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
        [AllowAnonymous]
        public async Task<ActionResult<List<UserAccountDTO>>> Login(LoginDTO obj)
        {
            if (ModelState.IsValid)
            {
                var data = _userRepository.Login(obj.UserName, obj.Password);
                if(data.UserID == 0)
                {
                    return NotFound();
                }
                else
                {
                    data.Token = _authRepository.GenarateToken(data);
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
                var data = _userRepository.ChangePassword(obj.UserID, obj.Password);
                return Ok(data);
            }
            else
            {
                return BadRequest("Something Wrong!");
            }
        }
    }
}
