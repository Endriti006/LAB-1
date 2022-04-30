using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportBookController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public ImportBookController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/ImportBook
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImportBook>>> GetImportBook()
        {
            return await _context.ImportBook.ToListAsync();
        }

        // GET: api/ImportBook/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ImportBook>> GetImportBook(int id)
        {
            var ImportBook = await _context.ImportBook.FindAsync(id);

            if (ImportBook == null)
            {
                return NotFound();
            }

            return ImportBook;
        }

        // PUT: api/ImportBook/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImportBook(int id, ImportBook ImportBook)
        {
            ImportBook.id = id;

            _context.Entry(ImportBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImportBookExists(id))
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

        // POST: api/ImportBook
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ImportBook>> PostImportBook(ImportBook ImportBook)
        {
            _context.ImportBook.Add(ImportBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImportBook", new { id = ImportBook.id }, ImportBook);
        }

        // DELETE: api/ImportBook/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ImportBook>> DeleteImportBook(int id)
        {
            var ImportBook = await _context.ImportBook.FindAsync(id);
            if (ImportBook == null)
            {
                return NotFound();
            }

            _context.ImportBook.Remove(ImportBook);
            await _context.SaveChangesAsync();

            return ImportBook;
        }

        private bool ImportBookExists(int id)
        {
            return _context.ImportBook.Any(e => e.id == id);
        }
    }
}

