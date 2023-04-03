using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class CreateBrandDto
    {
        [Required]
        public string? Name { get; set; }
    }
}