using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class DistributorRegister
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }
      //  public string Password { get; set; }
        public string StoreName { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public int PostalCode { get; set; }
        public string Country { get; set; }
    }
}
