using AngularJs.Dal.Context;
using AngularJs.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJs.UI.Controllers
{
    public class UserController : Controller
    {
        //Context'in Instance Alınması Bu Şekilde Yapılabilirdi. Constructor İçerisinde...
        //ProjectContext _context;
        //public UserController()
        //{
        //    _context = new ProjectContext();
        //}

        public ActionResult List()
        {
            return View();
        }

        public ActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Add(User user)
        {
            using (ProjectContext db = new ProjectContext())
            {
                db.Users.Add(user);
                db.SaveChanges();
            }
            return Json("Başarıyla Kayıt Edilmiştir.!!!", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetList()
        {
            using (ProjectContext db = new ProjectContext())
            {
                List<User> ListUsers = db.Users.ToList();

                return Json(ListUsers, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult GetUserID(Guid ID)
        {
            using (ProjectContext db = new ProjectContext())
            {
                User users = db.Users.Find(ID);
                return Json(users, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateUser(User user)
        {
            using (ProjectContext db = new ProjectContext())
            {
                //Context İçerisinde SaveChange'i Override Ederek Bu Tarz İşlemleri Sürekli Yapmamız Sağlanabilirdi.
                //veya Her Seferinde SaveChange'i Çağırmak Yerine Bir Metod İçerisinde Kullanıp Her SaveChange Yapılacağı Zaman O Metod'u Çağırabilirdik.
                db.Entry(user).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                List<User> ListUser = db.Users.ToList();
                return Json(ListUser, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DeleteUser(Guid id)
        {
            using (ProjectContext db = new ProjectContext())
            {
                User users = db.Users.Find(id);
                db.Entry(users).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
                List<User> ListUser = db.Users.ToList();
                return Json(ListUser, JsonRequestBehavior.AllowGet);
            }
        }
    }
}