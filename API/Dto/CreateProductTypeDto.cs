using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class CreateProductTypeDto
    {
        [Required]
        public string? Name { get; set; }
    }
}