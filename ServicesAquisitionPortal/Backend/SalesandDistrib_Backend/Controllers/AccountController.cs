using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesandDistrib_Backend.Models;

namespace SalesandDistrib_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Account
        [HttpGet]
        [Route("GetDistributors")]
        public ActionResult<Users> GetUsers()
        {
            int roleId = _context.Roles.Where(obj=>obj.Name=="Distributor").FirstOrDefault().Id;
            List<UserRoles> userRoleList = _context.UserRoles.Where(obj => obj.RoleId == roleId).ToList();
            List<DistributorRegister> distributorList = new List<DistributorRegister>();

            foreach (  UserRoles userRole in userRoleList)
            {
                Users user = _context.Users.Where(obj => obj.Id == userRole.UserId).FirstOrDefault();
                Store store = _context.Store.Where(obj => obj.UserId == user.Id).FirstOrDefault();

                DistributorRegister allDetail = new DistributorRegister();
                allDetail.FirstName = user.FirstName;
                allDetail.LastName = user.LastName;
                allDetail.Email = user.Email;
                allDetail.Contact = user.Contact;
                
                allDetail.StoreName = store.Name;

                allDetail.Address = user.Address;

distributorList.Add(allDetail);
                
            }
            
            return Ok(new {DistributorStatus="GetAll",allDistributors= distributorList });
        }

        // GET: api/Account/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // PUT: api/Account/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers([FromRoute] int id, [FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != users.Id)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Account
        [Route("DistRegister")]
        [HttpPost]
        public async Task<IActionResult> PostUsers([FromBody] DistributorRegister distributor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Users users = new Users();
            users.FirstName = distributor.FirstName;
            users.LastName = distributor.LastName;
            users.Email = distributor.Email;
            users.Contact = distributor.Contact;
            users.Address = distributor.Address;
            users.Password = "Numan311@";
            _context.Users.Add(users);

            DistributorInfo detail = new DistributorInfo();
            detail.DistributorId = users.Id;
            detail.City = distributor.City;
            detail.Province = distributor.Province;
            detail.PostalCode = distributor.PostalCode;
            detail.Country = distributor.Country;
            _context.DistributorDetail.Add(detail);

            Store store = new Store();
            store.UserId = users.Id;
            store.Name = distributor.StoreName;
            _context.Store.Add(store);
            Roles role = new Roles();
            bool isExist = _context.Roles.Any(obj => obj.Name == "Distributor");
            if (!isExist)
            {
                
                role.Name = "Distributor";
                _context.Roles.Add(role);
            }
            if (isExist)
            {
                role= _context.Roles.Where(obj => obj.Name == "Distributor").FirstOrDefault();
            }
            UserRoles userRole = new UserRoles();
            userRole.UserId = users.Id;
            userRole.RoleId = role.Id;
            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();
            return Ok(new { AccountStatus = "RegisteredSuccess"});
            //            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }
        [Route("Login")]
        [HttpPost]
            public  ActionResult Authenticate([FromBody] Users users)
        {
            bool isExist = _context.Users.Any(obj => obj.Email == users.Email && obj.Password == users.Password);
            if (isExist)
            {
                int UserId = _context.Users.Where(obj => obj.Email == users.Email && obj.Password == users.Password).FirstOrDefault().Id;
                return Ok(new { signInStatus = "Authorized",userId= UserId });
            }
            return Ok(new { signInStatus = "Not_Authorized" });
        }
        // DELETE: api/Account/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return Ok(users);
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}