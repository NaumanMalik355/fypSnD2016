using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
namespace EmployeeManagementSystem.Controllers
{
    public class ImageController : Controller
    {
        //COMMENT:static declaration of the CloudBlobClient so we can //interact with our storage service.
        static CloudBlobClient blobClient;
        //COMMENT:constant to hold the blob container name
        const string BLOB_CONTAINER_NAME = "photogallery-images";
        //COMMENT:static declaration of CloudBlobContainer which will store //a reference to the blobcontainer that we created earlier
        static CloudBlobContainer blobContainer;
        //COMMENT:declaration of ApplicationDbContext for an instance of our //database context.
        private ApplicationDbContext _context;
        //COMMENT:setup our configuration so that we can have access to the //Azure storage connection string later.
        public IConfiguration _configuration;
        //COMMENT:This is a property for GalleryImage with a //BindPropertyAttribute. This will automatically bind the data from //the form to the properties of GalleryImage when the form is //submitted.
        [BindProperty]
        public GalleryImage GalleryImage { get; set; }
        private readonly IOptions<MyConfig> _config;
        public ImageController(IConfiguration configuration, ApplicationDbContext context, IOptions<MyConfig> config)
        {
            _context = context;
            _configuration = configuration;
            _config = config;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<ActionResult> uploadImage()
        {// COMMENT:Retrieve storage account information from connection string 
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_config.Value.StorageConnection);
            // COMMENT:Create a blob client for interacting with the storage //blob service.
            blobClient = storageAccount.CreateCloudBlobClient();
            //COMMENT:this gets a reference to the container that we created earlier
            blobContainer = blobClient.GetContainerReference(BLOB_CONTAINER_NAME);
            //COMMENT:this will create a container with the name that we passed //above in the event that the container doesn't exist.
            await blobContainer.CreateIfNotExistsAsync();
            //COMMENT:set permissions to public access
            await blobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> uploadImage(IFormCollection form)
        {
            try
            {
                //COMMENT:we are only allowing one upload, so just get the first one //in the file collection.
                var file = form.Files.FirstOrDefault();
                //COMMENT:this block will store the image into the blobContainer //container
                CloudBlockBlob blob = blobContainer.GetBlockBlobReference(file?.FileName);
                blob.Properties.ContentType = file?.ContentType;
                await blob.UploadFromStreamAsync(file?.OpenReadStream());
                //COMMENT:set the url of the image that we just uploaded
                GalleryImage.URL = $"{blobContainer.StorageUri.PrimaryUri}/{file?.FileName}";
                //COMMENT:add a GalleryImage to the database and save it.
                _context.GalleryImages.Add(GalleryImage);
                await _context.SaveChangesAsync();
                //COMMENT:if we got this far, it was successful so let's tell the user.
                //set a tempData variable to a success string. we will use this //variable after the redirect to the gallery.
                TempData["SuccessMessage"] = "Image upload success!";
                return RedirectToAction("ShowImages");
            }
            catch //(Exception ex)
            {
                return RedirectToPage("Error");
            }
           
        }
        public ActionResult ShowImages()
        {
            List<GalleryImage> galleryImages = null;
            ViewData["SuccessMessage"] = TempData["SuccessMessage"];
            galleryImages =  _context.GalleryImages.ToList();
            return View(galleryImages);

        }

        public async Task<ActionResult> downLoadImages()
        {
            List<string> blobs = new List<string>();
            try
            {
                if (CloudStorageAccount.TryParse("DefaultEndpointsProtocol=https;AccountName=imgstorageaccount;AccountKey=ZiukYKYOhPWgWM/73l4JDfULMZ+kzacJbDXMyOh+/o0SSBJLyMXlXUOan2LdsVDoqp1R6kZ1oxMGssCGC+4r1A==;EndpointSuffix=core.windows.net", out CloudStorageAccount storageAccount))
                {
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

                    CloudBlobContainer container = blobClient.GetContainerReference("photogallery-images");

                    BlobResultSegment resultSegment = await container.ListBlobsSegmentedAsync(null);
                    foreach (IListBlobItem item in resultSegment.Results)
                    {
                        if (item.GetType() == typeof(CloudBlockBlob))
                        {
                            CloudBlockBlob blob = (CloudBlockBlob)item;
                            blobs.Add(blob.Name);
                        }
                        else if (item.GetType() == typeof(CloudPageBlob))
                        {
                            CloudPageBlob blob = (CloudPageBlob)item;
                            blobs.Add(blob.Name);
                        }
                        else if (item.GetType() == typeof(CloudBlobDirectory))
                        {
                            CloudBlobDirectory dir = (CloudBlobDirectory)item;
                            blobs.Add(dir.Uri.ToString());
                        }
                    }
                }
            }
            catch
            {
            }
            ViewData["SuccessMessage"]="lnkn";
            return View(blobs);
        }

        public async Task<ActionResult> GetFileFromBlob(string fileName)
        {

            MemoryStream ms = new MemoryStream();
            if (CloudStorageAccount.TryParse(_config.Value.StorageConnection, out CloudStorageAccount storageAccount))
            {
                CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = BlobClient.GetContainerReference(BLOB_CONTAINER_NAME);

                if (await container.ExistsAsync())
                {
                    CloudBlob file = container.GetBlobReference(fileName);

                    if (await file.ExistsAsync())
                    {
                        await file.DownloadToStreamAsync(ms);
                        Stream blobStream = file.OpenReadAsync().Result;
                        return File(blobStream, file.Properties.ContentType, file.Name);
                    }
                    else
                    {
                        return Content("File does not exist");
                    }
                }
                else
                {
                    return Content("Container does not exist");
                }
            }
            else
            {
                return Content("Error opening storage");
            }

            return View();
        }
         
    }
}