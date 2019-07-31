using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PackagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Packages
        [HttpGet]
        public ActionResult<Packages> GetPackages()
        {
            return Ok(new { PackageStatus="GetAll" ,AllPackages = _context.Packages });  ///get as packageStatus
        }

        // GET: api/Packages/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPackages([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packages = await _context.Packages.FindAsync(id);

            if (packages == null)
            {
                return NotFound();
            }

            return Ok(packages);
        }

        // PUT: api/Packages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackages([FromRoute] int id, [FromBody] Packages packages)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != packages.Id)
            {
                return BadRequest();
            }

            _context.Entry(packages).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackagesExists(id))
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

        // POST: api/Packages
        [HttpPost]
        public async Task<IActionResult> PostPackages([FromBody] Packages packages)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new {  PackageStatus = "CreatedFailure" });
               // return BadRequest(ModelState);
            }

            _context.Packages.Add(packages);
            await _context.SaveChangesAsync();
              return Ok(new { PackageStatus = "CreatedSuccess", AllPackages=_context.Packages });
           // return Ok(packages); or //CreatedAtAction("GetPackages", new { id = packages.Id }, packages);
        }

        // DELETE: api/Packages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackages([FromRoute] int id)
        {//return _context.Packages.RemoveRange()

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packages = await _context.Packages.FindAsync(id);
            if (packages == null)
            {
                return NotFound();
            }

            _context.Packages.Remove(packages);
            await _context.SaveChangesAsync();

            return Ok(packages);
        }

        private bool PackagesExists(int id)
        {
            return _context.Packages.Any(e => e.Id == id);
        }
    }
}