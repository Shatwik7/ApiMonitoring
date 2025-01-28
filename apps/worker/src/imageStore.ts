import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Page } from "puppeteer";
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY||"",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY||"",
  },
});
const bucketName = "api.incident";

/**
 * upload a buffer to Amazon S3.
 * @param buffer - The buffer of the image.
 * @param fileName - The name of the file to save in S3.
 * @returns The public URL of the uploaded file.
 */
async function uploadToS3(buffer: Buffer, fileName: string): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: "image/webp",
    });

    await s3Client.send(command);

    return `https://${bucketName}.s3.ap-south-1.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}

/**
 * Helper function to capture a screenshot and upload it to S3 without storing locally.
 * @param page - Puppeteer page instance.
 * @param apiId - The ID of the API.
 * @returns The URL of the uploaded screenshot or undefined if an error occurs.
 */
export async function takeScreenshot(
  page: Page,
  apiId: number
): Promise<string | undefined> {
  try {
    const fileName = `screenshots/api_${apiId}_${Date.now()}.webp`;

    const screenshotBuffer = await page.screenshot({ type: "webp" });

    if (!screenshotBuffer) {
      throw new Error("Failed to capture screenshot");
    }

    const buffer = Buffer.from(screenshotBuffer);

    const imageUrl = await uploadToS3(buffer, fileName);
    page.close();
    return imageUrl;
  } catch (error) {
    console.error(
      `Failed to capture and upload screenshot for API ID ${apiId}:`,
      error
    );
  }
}
