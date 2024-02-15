const { createClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const client = createClient({
  apiVersion: "2024-02-03",
  dataset: "production",
  projectId: "kpw7j4ql",
  useCdn: false,
  token:
    "skki4y7Hbda1rsUzIKxhW9Je4pfNixKP8rAuNVzDPmQz2xvgEqZpZqmfZIv71OM8mITLGWujwrBrGoODj1upmoSgytdQIt2YAopN8pxTA7RiCquUQcANL1JSjntvPcpWEoTNDLti6s29G23gXIrije6r4r8hz4KC87Gv6lKo1sj2git6FfjF",
});

// Function to list all files in a directory

// Function to list all files in a directory
function listFiles(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  return files
    .map((file) => path.join(directoryPath, file))
    .filter((filePath) => fs.statSync(filePath).isFile() && isImageFile(filePath));
}

function isImageFile(filePath) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const extension = path.extname(filePath).toLowerCase();
  return imageExtensions.includes(extension);
}

// Create article
async function createArticle(data) {
  const { title, description, body } = data;
  return client.create({
    _type: "article",
    title: title,
    slug: {
      _type: "slug",
      current: title.toLowerCase().replace(/ /g, "-"),
    },
    description: description,
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            marks: [],
            text: body,
          },
        ],
        marksDefs: [],
        style: "normal",
        _key: uuid.v4(),
      },
    ],
  });
}

// Create Gallery
async function createGallery(articleId, images) {
console.log("🚀 ~ createGallery ~ articleId, images:", articleId, images)

  return client.create({
    _type: "gallery",
    article: {
      _type: "article",
      _ref: articleId
    },
    images: images,
  });
}

async function main() {
  const dataFilePath = "bulk-images/data.json"; // Specify the path to your data file
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

  const article = await createArticle(data);
  const articleId = article._id;

  // Example usage:
  const directoryPath = "bulk-images"; // Specify the path to your folder
  const imagesList = listFiles(directoryPath);
  console.log("List of files:", imagesList);
  
  const images = imagesList.map((image) => {
    const res = client.assets
      .upload("image", fs.createReadStream(image), {
        filename: path.basename(image),
      })
      .then((imageAsset) => {
        return {
           _type: "image",
           asset: {
             _type: "reference",
             _ref: imageAsset._id,
           },
           _key: uuid.v4(),
           //  alt: filepath
         }
      })
    return res
  })
  
  const galleryImages = await Promise.all(images)
  .then((uploadedImages) => {
    console.log('Uploaded images:', uploadedImages);
    return uploadedImages
  })
  .catch((error) => {
    console.error('Error uploading images:', error);
  });
  
  await createGallery(articleId, galleryImages)
  
}

main().catch(console.error);
