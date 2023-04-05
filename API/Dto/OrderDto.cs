using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }

        public string? BuyerId { get; set; }

        public ShippingAddress? ShippingAddress { get; set; }

        public int MethodId { get; set; }

        public long Subtotal { get; set; }

        public long AdditionalExpenses { get; set; }

        public DateTime OrderDate { get; set; } 

        public string? OrderStatus { get; set; }

        public long Total { get; set; }

        public List<OrderItemDto>? OrderItems { get; set; }

        
    }
}