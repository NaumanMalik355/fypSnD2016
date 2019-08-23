using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Packages> Packages { get; set; }
        public DbSet<SelectedPackages> DistributorPackages { get; set; }
        public DbSet<Privileges> Privileges { get; set; }
        public DbSet<SelectedPrivileges> RolePrivileges { get; set; }
        public DbSet<DistributorAgents> DistributorAgents { get; set; }
        public DbSet<Store> Store { get; set; }
        public DbSet<DistributorInfo> DistributorDetail { get; set; }
    }
}
