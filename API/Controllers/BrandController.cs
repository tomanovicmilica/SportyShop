using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BrandController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public BrandController(StoreContext context, IMapper mapper) {

            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Brand>>> GetBrands() {
            var brands = await _context.Brands!
                .ToListAsync();

            return brands;
        }

        [HttpGet("{id}", Name = "GetBrand")]
        public async Task<ActionResult<Brand>> GetBrand(int id) {

            var brand = await _context!.Brands!.FindAsync(id);

            if(brand==null) return NotFound();

            return brand;
        }

        [HttpPost]
        public async Task<ActionResult<Brand>> CreateBrand([FromForm] CreateBrandDto brandDto)
        { 

            var brand = _mapper.Map<Brand>(brandDto);

            _context.Brands!.Add(brand);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBrand", new { Id = brand.BrandId }, brand);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product brand" });

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBrand(int id)
        {
            var brand = await _context.Brands!.FindAsync(id);

            if (brand == null) return NotFound();

            _context.Brands.Remove(brand);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting brand" });
        }
    }
}