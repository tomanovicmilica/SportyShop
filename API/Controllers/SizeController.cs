using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.RequestHelpers.Extensions;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SizeController: BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public SizeController(StoreContext context, IMapper mapper) {

            _context = context;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}", Name = "GetSize")]
        public async Task<ActionResult<UpdateSizeDto>> GetSize(int id) {

            var size = await _context!.Sizes!.ProjectSizeToSize().FirstOrDefaultAsync(x => x.Id == id);

            if(size==null) return NotFound();

            return size;
        }
        
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Size>> CreateSize([FromForm] SizeDto sizeDto)
        { 

            var size = _mapper.Map<Size>(sizeDto);

            _context.Sizes!.Add(size);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetSize", new { Id = size.Id }, size);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product size" });

        }

    }
}