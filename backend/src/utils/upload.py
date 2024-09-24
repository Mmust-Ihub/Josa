from decouple import config
import cloudinary,tinify
from cloudinary.uploader import upload
import time
PUBLIC_ID = config("PUBLIC_ID")

cloudinary.config(
  cloud_name = config("CLOUD_NAME"),
  api_key =  config("API_KEY"),
  api_secret = config("API_SECRET")
)

tinify.key = config("TINIFY_API_KEY")

def upload_image_to_cloud(filepath):
    resp = upload(filepath, public_id = f"{PUBLIC_ID}_{int(time.time())}")
    return resp["secure_url"]

def compress_image(filepath):
    source = tinify.from_file(filepath)
    source.to_file(filepath)