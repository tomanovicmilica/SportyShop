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
    public class ProductSizeController: BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public ProductSizeController(StoreContext context, IMapper mapper) {

            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductSize>>> GetProductSizes() {
            var productSizes = await _context.ProductSizes!
                .ToListAsync();

            return productSizes;
        }

        [HttpGet("{id}", Name = "GetProductSize")]
        public async Task<ActionResult<ProductSize>> GetProductSize(int id) {

            var productSize = await _context!.ProductSizes!.FindAsync(id);

            if(productSize==null) return NotFound();

            return productSize;
        }

        [HttpPost]
        public async Task<ActionResult<ProductSize>> CreateProductSize([FromForm] ProductSizeDto productSizeDto)
        { 

            var productSize = _mapper.Map<ProductSize>(productSizeDto);

            _context.ProductSizes!.Add(productSize);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProductSize", new { Id = productSize.Id }, productSize);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product size" });

        }

    }
}