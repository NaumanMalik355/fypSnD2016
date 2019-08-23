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
    public class PrivilegesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PrivilegesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Privileges
        [HttpGet]
        public ActionResult<RolePrivileges> GetPrivileges()
        {
            return Ok(new { list = _context.RolePrivileges });
        }

        // GET: api/Privileges/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrivileges([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var privileges = await _context.Privileges.FindAsync(id);

            if (privileges == null)
            {
                return NotFound();
            }

            return Ok(privileges);
        }

        // PUT: api/Privileges/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrivileges([FromRoute] int id, [FromBody] Privileges privileges)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != privileges.Id)
            {
                return BadRequest();
            }

            _context.Entry(privileges).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrivilegesExists(id))
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

        // POST: api/Privileges
        [HttpPost]
        public async Task<IActionResult> PostPrivileges([FromBody] Privileges privileges)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Privileges.Add(privileges);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrivileges", new { id = privileges.Id }, privileges);
        }
        public int getPrivilegesId(string priv)
        {
            bool isExist = _context.Privileges.Any(obj => obj.Name == priv);
            Privileges privObj=new Privileges();
            if (!isExist)
            {
                privObj.Name = priv;
                _context.Privileges.Add(privObj);
            }
            else
            {
                privObj = _context.Privileges.Where(obj => obj.Name == priv).FirstOrDefault();
            }
            return privObj.Id;
        }

        [HttpPost]
 [Route("AssignPrivilege")]
 public ActionResult PostRolePrivileges([FromBody] RolePrivileges rolePrivileges)
        {
         


            Roles role = new Roles();
            bool roleExist = _context.Roles.Any(obj => obj.Name == rolePrivileges.RoleName);
            if (!roleExist)
            {
                
                role.Name = rolePrivileges.RoleName;
                _context.Roles.Add(role);
            }
            else if (roleExist)
            {
                role = _context.Roles.Where(obj => obj.Name == rolePrivileges.RoleName).FirstOrDefault();
            }

          
            for(int i=0;i<rolePrivileges.selectedPrivileges.Count;i++)
            {
                SelectedPrivileges selectedPrivilege = new SelectedPrivileges();
                selectedPrivilege.DistributorId = rolePrivileges.distId;
                selectedPrivilege.RoleId = role.Id;
                selectedPrivilege.PrivilgeId = getPrivilegesId(rolePrivileges.selectedPrivileges[i]);
                _context.RolePrivileges.Add(selectedPrivilege);
            }
            _context.SaveChanges();
            return Ok(new {AssignRolePrivilegesStatus="Success",RolePrivilegesList=_context.RolePrivileges });
        }
        // DELETE: api/Privileges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrivileges([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var privileges = await _context.Privileges.FindAsync(id);
            if (privileges == null)
            {
                return NotFound();
            }

            _context.Privileges.Remove(privileges);
            await _context.SaveChangesAsync();

            return Ok(privileges);
        }

        private bool PrivilegesExists(int id)
        {
            return _context.Privileges.Any(e => e.Id == id);
        }
    }
}