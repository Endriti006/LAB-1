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
    public class AbonuesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public AbonuesiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select AbonuesiId, fullName,Shkollimi,VitiLindjes,Vendbanimi,
                            convert(varchar(10),DateOfJoining,120) as DateOfJoining
                            from
                            dbo.Abonuesi
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
        public JsonResult Post(Abonuesi ab)
        {
            string query = @"
                           insert into dbo.Abonuesi
                           (fullName,Shkollimi,DateOfJoining,VitiLindjes,Vendbanimi)
                    values (@fullName,@Shkollimi,@DateOfJoining,@VitiLindjes,@Vendbanimi)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fullName", ab.fullName);
                    myCommand.Parameters.AddWithValue("@Shkollimi", ab.Shkollimi);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", ab.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@VitiLindjes", ab.VitiLindjes);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", ab.Vendbanimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Abonuesi ab)
        {
            string query = @"
                           update dbo.Abonuesi
                           set fullName= @fullName,
                            Shkollimi=@Shkollimi,
                            DateOfJoining=@DateOfJoining,
                            VitiLindjes=@VitiLindjes,
                            Vendbanimi=@Vendbanimi
                            where AbonuesiId = @AbonuesiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AbonuesiId", ab.AbonuesiId);
                    myCommand.Parameters.AddWithValue("@fullName", ab.fullName);
                    myCommand.Parameters.AddWithValue("@Shkollimi", ab.Shkollimi);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", ab.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@VitiLindjes", ab.VitiLindjes);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", ab.Vendbanimi);
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
                           delete from dbo.Abonuesi
                            where AbonuesiId=@AbonuesiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AbonuesiId", id);

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


