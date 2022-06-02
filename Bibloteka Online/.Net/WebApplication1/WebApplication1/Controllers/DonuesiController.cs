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
    public class DonuesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public DonuesiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select DonuesiId, fullName,EmriLibrat,Vendbanimi, nrLeternjoftim,
                            convert(varchar(10),DitaEDorzimit,120) as DitaEDorzimit
                            from
                            dbo.Donuesi
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
        public JsonResult Post(Donuesi don)
        {
            string query = @"
                           insert into dbo.Donuesi
                           (fullName,EmriLibrat,Vendbanimi, nrLeternjoftim,DitaEDorzimit)
                    values (@fullName,@EmriLibrat,@Vendbanimi, @nrLeternjoftim,@DitaEDorzimit)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fullName", don.fullName);
                    myCommand.Parameters.AddWithValue("@EmriLibrat", don.EmriLibrat);           
                    myCommand.Parameters.AddWithValue("@Vendbanimi", don.Vendbanimi);
                    myCommand.Parameters.AddWithValue("@nrLeternjoftim", don.nrLeternjoftim);
                    myCommand.Parameters.AddWithValue("@DitaEDorzimit", don.DitaEDorzimit);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Donuesi don)
        {
            string query = @"
                           update dbo.Donuesi
                           set fullName= @fullName,
                            EmriLibrat=@EmriLibrat,
                            Vendbanimi=@Vendbanimi,
                            nrLeternjoftim=@nrLeternjoftim,
                            DitaEDorzimit=@DitaEDorzimit
                            where DonuesiId = @DonuesiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DonuesiId", don.DonuesiId);
                    myCommand.Parameters.AddWithValue("@fullName", don.fullName);
                    myCommand.Parameters.AddWithValue("@EmriLibrat", don.EmriLibrat);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", don.Vendbanimi);
                    myCommand.Parameters.AddWithValue("@nrLeternjoftim", don.nrLeternjoftim);
                    myCommand.Parameters.AddWithValue("@DitaEDorzimit", don.DitaEDorzimit);
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
                           delete from dbo.Donuesi
                            where DonuesiId=@DonuesiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DonuesiId", id);

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


