// const generatePdf = () => {
//   // const doc = new jsPDF();
//   // // Set up content area (adjust as needed)
//   // const content = document.querySelector("#previewContent");
//   // if (content) {
//   //   // You can scale the content to fit better within the page
//   //   doc.html(content as HTMLElement, {
//   //     margin: [10, 5, 20, 5],
//   //     autoPaging: true,
//   //     callback: function (doc) {
//   //       // Save the PDF
//   //       doc.save("api_documentation.pdf");
//   //     },
//   //     x: 10,
//   //     y: 10,
//   //     html2canvas: {
//   //       scale: 0.2, // Scale down the content for better fitting
//   //       logging: true, // Enable logging to debug the canvas rendering
//   //       useCORS: true, // Allow cross-origin resources
//   //     },
//   //   });
//   // }
//   // ------------------------------
//   //   const printContent = document.getElementById("previewContent");
//   //   const printWindow = window.open("", "_blank");
//   //   if (printContent && printWindow) {
//   //     printWindow.document.write(`
//   //       <html>
//   //         <head>
//   //           <title>Print Preview</title>
//   //           <style>
//   //             /* Prevent headers and footers */
//   //             @media print {
//   //               @page {
//   //                 margin: 0; /* Removes all default margins */
//   //               }
//   //               body {
//   //                 margin: 20;
//   //                 padding: 0;
//   //                 box-shadow: none;
//   //               }
//   //               /* Ensures no button will be printed */
//   // button {
//   //                 display: none;
//   //               }
//   //               /* Optional: Add some margin to the print content */
//   //               #previewContent {
//   //                 margin: 20mm; /* Adjust this value */
//   //               }
//   //               /* Prevent splitting content across pages */
//   //               #previewContent * {
//   //                 page-break-inside: avoid; /* Prevent content splitting */
//   //               }
//   //               /* Optional: Force content to start on a new page */
//   //               .new-page {
//   //                 page-break-before: always;
//   //               }
//   //             }
//   //           </style>
//   //         </head>
//   //         <body>${printContent.innerHTML}</body>
//   //       </html>
//   //     `);
//   //     printWindow.document.close();
//   //     printWindow.focus();
//   //     printWindow.print();
//   //     printWindow.close();
//   //   }

//   const doc = new jsPDF();
//   const elementHTML = document.getElementById("previewContent");
//   if (elementHTML) {
//     doc.html(elementHTML, {
//       margin: [20, 10, 20, 10], // margin for top, left, bottom, right
//       x: 10, // x position for content
//       y: 10, // y position for content
//       html2canvas: {
//         scale: 0.25, // Scale down the content for fitting into the page (default is 1)
//         logging: true, // Optional: For debugging canvas rendering
//         useCORS: true, // Optional: Allow cross-origin resources (useful for images)
//       },
//       // jsPDF options are not valid here, remove this block
//       callback: function (doc) {
//         doc.save("api_documentation.pdf");
//       },
//     });
//   }
// };

{
  /*}
  const generatePdf = () => {
    const doc = new jsPDF();
    const elementHTML = document.getElementById("previewContent");

    if (elementHTML) {
      const pageHeight = doc.internal.pageSize.height; // Get the height of the page
      let currentY = 10; // Start from the top of the page

      // Function to handle adding content with page breaks
      const addContentWithPageBreaks = () => {
        doc.html(elementHTML, {
          margin: [20, 10, 20, 10], // margin for top, left, bottom, right
          x: 10, // x position for content
          y: currentY, // current y position for content
          html2canvas: {
            scale: 0.25, // Scale down the content for fitting into the page (default is 1)
            logging: true, // Optional: For debugging canvas rendering
            useCORS: true, // Optional: Allow cross-origin resources (useful for images)
          },
          callback: (doc) => {
            // Get the height of the content added
            const contentHeight = currentY + 100; // Estimation for content height (adjust this based on your actual content size)

            // Check if the content is near the bottom of the page
            if (contentHeight >= pageHeight - 50) {
              // If there is less than 50mm space left, create a new page
              doc.addPage();
              currentY = 10; // Reset Y position for the next page
            } else {
              currentY = contentHeight; // Update the current Y position after content is added
            }

            doc.save("api_documentation.pdf");
          },
        });
      };

      // Start adding content with page breaks
      addContentWithPageBreaks();
    }
  };
  */
}
