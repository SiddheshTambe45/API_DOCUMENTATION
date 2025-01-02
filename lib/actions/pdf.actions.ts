"use server";

// lib/pdf.actions.ts
import puppeteer from "puppeteer";

// types/pdf.ts
export interface PdfGenerationRequest {
  htmlContent: string;
}

export interface PdfGenerationResponse {
  pdfBuffer: Buffer;
}

export async function generatePdfFromHtml(
  htmlContent: string
): Promise<Buffer> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true, // Enable pagination with header/footer
      headerTemplate: "<span class='title'></span>", // Custom header (if needed)
      footerTemplate: "<span class='pageNumber'></span>", // Custom footer
      margin: { top: "50px", bottom: "50px", left: "20px", right: "20px" }, // Adjust margins
    });

    await browser.close();

    // Convert the Uint8Array to Buffer (necessary for Next.js server actions)
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("PDF generation failed");
  }
}
