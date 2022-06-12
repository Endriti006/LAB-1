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
    public class AudioBooksController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public AudioBooksController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select AudioBooksId, AudioBooksName,AudioBooksAuthor,
                            convert(varchar(10),publishDate,120) as publishDate,PhotoFileName, Genre
                            from
                            dbo.AudioBooks
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
        public JsonResult Post(AudioBooks bk)
        {
            string query = @"
                           insert into dbo.AudioBooks
                           (AudioBooksName,AudioBooksAuthor,publishDate,PhotoFileName, Genre)
                    values (@AudioBooksName,@AudioBooksAuthor,@publishDate,@PhotoFileName, @Genre)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AudioBooksName", bk.AudioBooksName);
                    myCommand.Parameters.AddWithValue("@AudioBooksAuthor", bk.AudioBooksAuthor);
                    myCommand.Parameters.AddWithValue("@publishDate", bk.publishDate);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", bk.PhotoFileName);
                    myCommand.Parameters.AddWithValue("@Genre", bk.Genre);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(AudioBooks bk)
        {
            string query = @"
                           update dbo.AudioBooks
                           set AudioBooksName= @AudioBooksName,
                            AudioBooksAuthor=@AudioBooksAuthor,
                            publishDate=@publishDate,
                            PhotoFileName=@PhotoFileName,
                            Genre=@Genre
                            where AudioBooksId=@AudioBooksId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AudioBooksId", bk.AudioBooksId);
                    myCommand.Parameters.AddWithValue("@AudioBooksName", bk.AudioBooksName);
                    myCommand.Parameters.AddWithValue("@AudioBooksAuthor", bk.AudioBooksAuthor);
                    myCommand.Parameters.AddWithValue("@publishDate", bk.publishDate);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", bk.PhotoFileName);
                    myCommand.Parameters.AddWithValue("@Genre", bk.Genre);
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
                           delete from dbo.AudioBooks
                            where AudioBooksId=@AudioBooksId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AudioBooksId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }

    }
}


