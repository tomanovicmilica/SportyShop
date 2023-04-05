using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.RequestHelpers;
using API.RequestHelpers.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public ProductsController(StoreContext context, IMapper mapper) {

            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams) {
            var query = _context.Products!
                .Sort(productParams.OrderBy!)
                .Search(productParams.SearchTerm!)
                .Filter(productParams.Brands!, productParams.Types!)
                .AsQueryable();

                var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
                return products!;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id) {

            var product = await _context!.Products!.FindAsync(id);

            if(product==null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products!.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products!.Select(p => p.ProductType).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        { 

            var product = _mapper.Map<Product>(productDto);

            _context.Products!.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.ProductId }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });

        }

        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
        { 
            var product = await _context.Products!.FindAsync(productDto.ProductId);

            if (product == null) return NotFound();

            _mapper.Map(productDto, product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products!.FindAsync(id);

            if (product == null) return NotFound();

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }


    }
}