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
    public class PaymentMethodsController: BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public PaymentMethodsController(StoreContext context, IMapper mapper) {

            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<PaymentMethod>>> GetPaymentMethods() {
            var paymentMethods = await _context.PaymentMethods!
                .ToListAsync();

            return paymentMethods;
        }

        [HttpGet("{id}", Name = "GetPaymentMethod")]
        public async Task<ActionResult<PaymentMethod>> GetPaymentMethod(int id) {

            var paymentMethod = await _context!.PaymentMethods!.FindAsync(id);

            if(paymentMethod==null) return NotFound();

            return paymentMethod;
        }

        [HttpPost]
        public async Task<ActionResult<PaymentMethod>> CreatePaymentMethod([FromForm] PaymentMethodDto paymentMethodDto)
        { 

            var paymentMethod = _mapper.Map<PaymentMethod>(paymentMethodDto);

            _context.PaymentMethods!.Add(paymentMethod);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetPaymentMethod", new { Id = paymentMethod.MethodId }, paymentMethod);

            return BadRequest(new ProblemDetails { Title = "Problem creating new payment method" });

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePaymentMethod(int id)
        {
            var paymentMethod = await _context.PaymentMethods!.FindAsync(id);

            if (paymentMethod == null) return NotFound();

            _context.PaymentMethods.Remove(paymentMethod);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting paymentMethod" });
        }
    }
}