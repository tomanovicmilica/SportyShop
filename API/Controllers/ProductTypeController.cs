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
    public class ProductTypeController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public ProductTypeController(StoreContext context, IMapper mapper) {

            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes() {
            var productTypes = await _context.ProductTypes!
                .ToListAsync();

            return productTypes;
        }

        [HttpGet("{id}", Name = "GetProductType")]
        public async Task<ActionResult<ProductType>> GetProductType(int id) {

            var productType = await _context!.ProductTypes!.FindAsync(id);

            if(productType==null) return NotFound();

            return productType;
        }

        [HttpPost]
        public async Task<ActionResult<ProductType>> CreateProductType([FromForm] CreateProductTypeDto productTypeDto)
        { 

            var productType = _mapper.Map<ProductType>(productTypeDto);

            _context.ProductTypes!.Add(productType);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProductType", new { Id = productType.ProductTypeId }, productType);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product type" });

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProductType(int id)
        {
            var productType = await _context.ProductTypes!.FindAsync(id);

            if (productType == null) return NotFound();

            _context.ProductTypes.Remove(productType);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product type" });
        }
    }
}