"use server";
import axios from "axios";
export const uploadToCloudinary = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    if (!file) throw new Error("No Image found to upload ...");
    const cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;
    const res = await axios.post(cloudinaryUploadURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload image to cloudinary");
  }
};
