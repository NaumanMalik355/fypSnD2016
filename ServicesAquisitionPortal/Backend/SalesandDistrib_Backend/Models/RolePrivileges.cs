using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class RolePrivileges
    {
        public string RoleName { get; set; }
        public int distId { get; set; }
        public List<string> selectedPrivileges { get; set; }
    }
}
