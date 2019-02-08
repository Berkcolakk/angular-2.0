using AngularJs.Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJs.Map.Map.Options
{
   public class UserMap:EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("dbo.User");

            Property(x => x.ID).HasColumnName("ID").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).HasColumnOrder(1);

            Property(x => x.Name).HasMaxLength(200).IsOptional();

            Property(x => x.LastName).HasMaxLength(200).IsOptional();

            Property(x => x.UserName).HasMaxLength(200).IsOptional();

            Property(x => x.Email).HasMaxLength(200).IsOptional();
        }
    }
}
