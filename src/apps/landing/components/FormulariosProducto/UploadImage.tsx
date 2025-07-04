export const handleImageUpload = async (files: File[]) => {
  const urls = [];

  for (const file of Array.from(files)) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Thrill");

    const res = await fetch("https://api.cloudinary.com/v1_1/dmlaojrbb/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    urls.push(data.secure_url); 
  }

  return urls;
};
