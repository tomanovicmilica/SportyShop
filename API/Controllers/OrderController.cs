using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.RequestHelpers.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrderController: BaseApiController
    {
        private readonly StoreContext _context;

        public OrderController(StoreContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders() 
        {
            var orders = await _context.Orders!
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == User.Identity!.Name)
                .ToListAsync();

            return orders;
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto?>> GetOrder(int id) 
        {
            return await _context.Orders!
                .ProjectOrderToOrderDto()
                .FirstOrDefaultAsync(x => x.BuyerId == User.Identity!.Name && x.OrderId == id);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        { 
            var basket = await _context.Baskets!
                .RetrieveBasketWithItems(User.Identity!.Name!)
                .FirstOrDefaultAsync();

            if(basket == null) return BadRequest(new ProblemDetails
            {
                Title = "Could not find basket"
            });

            var items = new List<OrderItem>();

            foreach(var item in basket.Items) {
                var productItem = await _context.Products!.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered 
                {
                    ProductId = productItem!.ProductId,
                    Name = productItem!.Name,
                    ImageUrl = productItem.ImageUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);

            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 10000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                AdditionalExpenses = deliveryFee
            };

            _context.Orders!.Add(order);
            _context.Baskets!.Remove(basket);

            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(a => a.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress!.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    Address3 = orderDto.ShippingAddress.Address3,
                    City = orderDto.ShippingAddress.City,
                    Zip = orderDto.ShippingAddress.Zip,
                    Country = orderDto.ShippingAddress.Country
                };

                user!.Address = address;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new { id = order.OrderId }, order.OrderId);

            return BadRequest("Problem creating order");
        }
    }
}