using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Size
    {
        [Key]
        public int Id { get; set; }

        public string? SizeOfProduct { get; set; }

       public List<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();
    }
}