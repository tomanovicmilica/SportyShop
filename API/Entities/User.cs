using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<int>
    {
        public string? Name { get; set; }

        public string? LastName { get; set; }

        public UserAddress? Address { get; set; }

    
    }
}