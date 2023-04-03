using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        public string? BuyerId { get; set; }

        [Required]
        public ShippingAddress? ShippingAddress { get; set; }

         public List<OrderItem>? OrderItems { get; set; }

        //[ForeignKey(nameof(PaymentMethod))]
        public PaymentMethod? PaymentMethod { get; set; }
        public int MethodId { get; set; }

        public long Subtotal { get; set; }

        public long AdditionalExpenses { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;


         public long GetTotal()
        {
            return Subtotal + AdditionalExpenses;
        }
    }
}