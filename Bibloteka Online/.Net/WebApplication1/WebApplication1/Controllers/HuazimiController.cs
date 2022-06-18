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
    public class HuazimiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public HuazimiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select HuazimiId, BookName,Huazuesi,
                            convert(varchar(10),HuazimiDate,120) as HuazimiDate,convert(varchar(10),ReturnDate,120) as ReturnDate
                            from
                            dbo.Huazimi
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
        public JsonResult Post(Huazimi emp)
        {
            string query = @"
                           insert into dbo.Huazimi
                           (BookName,Huazuesi,HuazimiDate,ReturnDate)
                    values (@BookName,@Huazuesi,@HuazimiDate,@ReturnDate)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@BookName", emp.BookName);
                    myCommand.Parameters.AddWithValue("@Huazuesi", emp.Huazuesi);
                    myCommand.Parameters.AddWithValue("@HuazimiDate", emp.HuazimiDate);
                    myCommand.Parameters.AddWithValue("@ReturnDate", emp.ReturnDate);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Huazimi emp)
        {
            string query = @"
                           update dbo.Huazimi
                           set BookName= @BookName,
                            Huazuesi=@Huazuesi,
                            HuazimiDate=@HuazimiDate,
                            ReturnDate=@ReturnDate
                            where HuazimiId=@HuazimiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@HuazimiId", emp.HuazimiId);
                    myCommand.Parameters.AddWithValue("@BookName", emp.BookName);
                    myCommand.Parameters.AddWithValue("@Huazuesi", emp.Huazuesi);
                    myCommand.Parameters.AddWithValue("@HuazimiDate", emp.HuazimiDate);
                    myCommand.Parameters.AddWithValue("@ReturnDate", emp.ReturnDate);
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
                           delete from dbo.Huazimi
                            where HuazimiId=@HuazimiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@HuazimiId", id);

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
