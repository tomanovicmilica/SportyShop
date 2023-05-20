using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.RequestHelpers;
using API.RequestHelpers.Extensions;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        private readonly ImageService _imageService;

        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService) {

            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<UpdateProductDto>>> GetProducts([FromQuery] ProductParams productParams) {

            var query = _context.Products!
                .Sort(productParams.OrderBy!)
                .Search(productParams.SearchTerm!)
                .Filter(productParams.Brands!, productParams.Types!)
                .ProjectProductSizeToProduct()
                .AsQueryable();

                var products = await PagedList<UpdateProductDto>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
                Response.AddPaginationHeader(products.MetaData);
                return products!;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<UpdateProductDto?>> GetProduct(int id) {

            return await _context!.Products!
                    .ProjectProductSizeToProduct().FirstOrDefaultAsync(x => x.ProductId == id);

            
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products!.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products!.Select(p => p.ProductType).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        { 

            var product = _mapper.Map<Product>(productDto);

             if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                product.ImageUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products!.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.ProductId }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });

        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
        { 
            var product = await _context.Products!.FindAsync(productDto.ProductId);

            if (product == null) return NotFound();

            _mapper.Map(productDto, product);

             if (productDto.File != null)
            {
                var imageUploadResult = await _imageService.AddImageAsync(productDto.File);

                if (imageUploadResult.Error != null) 
                    return BadRequest(new ProblemDetails { Title = imageUploadResult.Error.Message });

                if (!string.IsNullOrEmpty(product.PublicId)) 
                    await _imageService.DeleteImageAsync(product.PublicId);

                product.ImageUrl = imageUploadResult.SecureUrl.ToString();
                product.PublicId = imageUploadResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products!.FindAsync(id);

            if (product == null) return NotFound();

             if (!string.IsNullOrEmpty(product.PublicId)) 
                await _imageService.DeleteImageAsync(product.PublicId);


            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }

        
       

    }
}