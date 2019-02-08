using AngularJs.Map.Map.Options;
using AngularJs.Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJs.Dal.Context
{
   public class ProjectContext:DbContext
    {
        public ProjectContext() /*: base("FinalProjectContext")*/
        {
            Database.Connection.ConnectionString = @"server=.;database=TestAngular;Integrated Security = True";
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new UserMap());
            base.OnModelCreating(modelBuilder);
        }

        //public override int SaveChanges()
        //{

        //    var Entries = ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        //    //Proje İçerisinde Loglamalar Yapılacak İse
        //    //string identity = WindowsIdentity.GetCurrent().Name;
        //    //string computerName = Environment.MachineName;
        //    //DateTime date = DateTime.Now;
        //    //string ip = RemoteIP.IpAddress; IP Adresini Bulmak İçin Bir Class Yazabilir

        //LOGLAMALAR....
        //    foreach (var item in Entries)
        //    {
        //        //CoreEntity'e Cast ediyoruz.
        //        BaseEntity entity = item.Entity as BaseEntity;
        //        if (item != null)
        //        {
        //            if (item.State == EntityState.Added)
        //            {
        //                entity.Status = Core.Core.Entity.Enum.Status.Active;
        //                entity.CreatedADUserName = identity;
        //                entity.CreatedComputerName = computerName;
        //                entity.CreatedDate = date;
        //                entity.CreatedIp = ip;
        //            }
        //            else if (item.State == EntityState.Modified)
        //            {
        //                entity.ModifiedADUserName = identity;
        //                entity.ModifiedComputerName = computerName;
        //                entity.ModifiedDate = date;
        //                entity.ModifiedIp = ip;
        //            }
        //        }
        //    }
        //    return base.SaveChanges();
        //}
    }
}
