using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        [Key]
        public int BasketId { get; set; }

        public int SubtotalPrice { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public string? UserId { get; set; }

        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public string? PaymentIntentId { get; set; }
        public string? ClientSecret { get; set; }

        public void AddItem(Product product, int quantity, string size)
        {
            if (Items.All(item => item.ProductId != product.ProductId || item.Size !=size))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity, Size = size });
                return;
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.ProductId && item.Size==size);
            if (existingItem != null) existingItem.Quantity += quantity;
            //dodati i size u proveru
        }

        public void RemoveItem(int productId,string size, int quantity = 1)
        {
            var item = Items.FirstOrDefault(basketItem => basketItem.ProductId == productId && basketItem.Size == size);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}