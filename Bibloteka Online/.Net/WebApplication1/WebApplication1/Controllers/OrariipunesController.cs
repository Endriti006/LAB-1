using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrariipunesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public OrariipunesController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select OrariipunesId, EmployeeName,
                            convert(varchar(10),Fillimi,120) as Fillimi,
                            convert(varchar(10),Mbarimi,120) as Mbarimi,
                            pushimi
                            from
                            dbo.Orariipunes
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Orariipunes op)
        {
            string query = @"
                           insert into dbo.Orariipunes
                           (EmployeeName,Fillimi,Mbarimi,pushimi)
                    values (@EmployeeName,@Fillimi,@Mbarimi,@pushimi)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeName", op.EmployeeName);
                    myCommand.Parameters.AddWithValue("@Fillimi", op.Fillimi);
                    myCommand.Parameters.AddWithValue("@Mbarimi", op.Mbarimi);
                    myCommand.Parameters.AddWithValue("@pushimi", op.pushimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Orariipunes op)
        {
            string query = @"
                           update dbo.Orariipunes
                           set EmployeeName= @EmployeeName,
                            Fillimi=@Fillimi,
                            Mbarimi=@Mbarimi,
                            pushimi=@pushimi
                            where OrariipunesId=@OrariipunesId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrariipunesId", op.OrariipunesId);
                    myCommand.Parameters.AddWithValue("@EmployeeName", op.EmployeeName);
                    myCommand.Parameters.AddWithValue("@Fillimi", op.Fillimi);
                    myCommand.Parameters.AddWithValue("@Mbarimi", op.Mbarimi);
                    myCommand.Parameters.AddWithValue("@pushimi", op.pushimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Orariipunes
                            where OrariipunesId=@OrariipunesId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrariipunesId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


       

    }
}
