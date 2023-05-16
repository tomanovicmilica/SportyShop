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

        public void AddItem(Product product, ProductSize size, int quantity)
        {
            if (Items.All(item => item.ProductId != product.ProductId && item.SizeId != size.SizeId))
            {
                Items.Add(new BasketItem { Product = product, ProductSize = size,Quantity = quantity });
                return;
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.ProductId && item.SizeId == size.SizeId);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int sizeId, int quantity = 1)
        {
            var item = Items.FirstOrDefault(basketItem => basketItem.ProductId == productId && basketItem.SizeId == sizeId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}