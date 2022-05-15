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
    public class KujdestariaController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public KujdestariaController(IConfiguration configuration,IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select KujdestariaID, dita, nderrimi,
                            orari_Nga , orari_Deri                            
                            from
                            dbo.Kujdestaria
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
        public JsonResult Post(Kujdestaria kuj)
        {
            string query = @"
                           insert into dbo.Kujdestaria
                           (dita, nderrimi, orari_Nga, orari_Deri)
                    values (@dita, @nderrimi, @orari_Nga, @orari_Deri)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@dita", kuj.dita);
                    myCommand.Parameters.AddWithValue("@nderrimi", kuj.nderrimi);
                    myCommand.Parameters.AddWithValue("@orari_Nga", kuj.orari_Nga);
                    myCommand.Parameters.AddWithValue("@orari_Deri", kuj.orari_Deri);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Kujdestaria kuj)
        {
            string query = @"
                           update dbo.Kujdestaria
                           set dita = @dita,
                            nderrimi = @nderrimi,
                            orari_Nga = @orari_Nga,
                            orari_Deri = @orari_Deri
                            where KujdestariaID = @KujdestariaID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KujdestariaID", kuj.KujdestariaID);
                    myCommand.Parameters.AddWithValue("@dita", kuj.dita);
                    myCommand.Parameters.AddWithValue("@nderrimi", kuj.nderrimi);
                    myCommand.Parameters.AddWithValue("@orari_Nga", kuj.orari_Nga);
                    myCommand.Parameters.AddWithValue("@orari_Deri", kuj.orari_Deri);
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
                           delete from dbo.Kujdestaria
                            where KujdestariaID = @KujdestariaID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KujdestariaID", id);

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