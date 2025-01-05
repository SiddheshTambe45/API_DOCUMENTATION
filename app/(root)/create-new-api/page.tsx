// "use client";

// import ApiForm from "@/components/ApiForm";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Preview from "@/components/Preview";
// import { Button } from "@/components/ui/button";
// // import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { base64Font } from "@/lib/utils";

// // Validator for the response body
// const resBodyValidator = z.object({
//   status: z.number(),
//   data: z.union([z.record(z.string()), z.array(z.unknown())]).optional(),
// });

// const formSchema = z
//   .object({
//     url: z.string().url(),
//     title: z.string(),
//     description: z.string(),
//     method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
//     reqParams: z.record(z.string()).optional(),
//     resBody: resBodyValidator,
//     reqBody: z.union([z.record(z.unknown()), z.array(z.unknown())]).optional(),
//   })
//   .refine(
//     (data) => {
//       if (["GET", "DELETE"].includes(data.method) && !data.reqParams) {
//         return false;
//       }
//       if (["PUT", "PATCH"].includes(data.method) && !data.reqBody) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: "Invalid combination of HTTP method and parameters or body.",
//       path: [],
//     }
//   );

// export type FormData = z.infer<typeof formSchema>;

// const CreateNewApiDoc = () => {
//   const [apis, setApis] = useState<FormData[]>([]); // Store APIs
//   const [currentApiIndex, setCurrentApiIndex] = useState<number>(0); // Track current API

//   const onSubmit = (values: FormData) => {
//     // Add the current form values to the apiDocs array
//     setApis((prevApiDocs: FormData[]) => [...prevApiDocs, values]);
//   };
//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       url: "",
//       title: "",
//       description: "",
//       method: "GET",
//       reqParams: {
//         key: "value",
//       },
//       resBody: {
//         status: 200,
//         data: {},
//       },
//       reqBody: {},
//     },
//   });

//   // const onSubmit = (values: FormData) => {
//   //   console.log("Form submitted with values: ", values);
//   // };

//   // const generatePdf = async () => {
//   //   const previewElement = document.getElementById("previewContent");
//   //   if (previewElement) {
//   //     // Use html2canvas to capture the Preview component as an image
//   //     html2canvas(previewElement, {
//   //       scrollX: 0,
//   //       scrollY: -window.scrollY,
//   //     }).then((canvas) => {
//   //       const imgData = canvas.toDataURL("image/png");
//   //       const pdf = new jsPDF();

//   //       // Page dimensions and image size
//   //       const pageHeight = pdf.internal.pageSize.height;
//   //       const contentHeight = canvas.height;
//   //       let heightLeft = contentHeight;
//   //       let position = 0;

//   //       // Add first page
//   //       pdf.addImage(
//   //         imgData,
//   //         "PNG",
//   //         0,
//   //         position,
//   //         pdf.internal.pageSize.width,
//   //         (canvas.height * pdf.internal.pageSize.width) / canvas.width
//   //       );
//   //       heightLeft -= pageHeight;

//   //       // Handle multi-page logic if content is too long
//   //       while (heightLeft > 0) {
//   //         position = heightLeft - contentHeight;
//   //         pdf.addPage();
//   //         pdf.addImage(
//   //           imgData,
//   //           "PNG",
//   //           0,
//   //           position,
//   //           pdf.internal.pageSize.width,
//   //           (canvas.height * pdf.internal.pageSize.width) / canvas.width
//   //         );
//   //         heightLeft -= pageHeight;
//   //       }

//   //       // Save the PDF
//   //       pdf.save("api-documentation.pdf");
//   //     });
//   //   }
//   // };

//   // const generatePdf = async () => {
//   //   const currentValues = form.getValues();

//   //   const pdf = new jsPDF();
//   //   // Add the font to the VFS
//   //   pdf.addFileToVFS("SFMono-Regular.ttf", base64Font);
//   //   let yPosition = 10; // Starting position for the content
//   //   const pageHeight = pdf.internal.pageSize.height;

//   //   // Utility function to check and add new page if overflow occurs
//   //   const checkPageOverflow = () => {
//   //     if (yPosition > pageHeight - 20) {
//   //       // 20px margin from bottom
//   //       pdf.addPage();
//   //       yPosition = 10; // Reset to top of the new page
//   //     }
//   //   };

//   //   // Add Title
//   //   pdf.setFontSize(16);
//   //   pdf.setFont("helvetica", "bold");
//   //   pdf.text("API Documentation", 10, yPosition);
//   //   yPosition += 17;

//   //   // Add URL
//   //   pdf.setFontSize(12);
//   //   pdf.setFont("helvetica", "normal");
//   //   pdf.text("URL:", 10, yPosition);
//   //   yPosition += 7;
//   //   pdf.setFont("helvetica", "courier");
//   //   pdf.text(currentValues.url, 10, yPosition);
//   //   yPosition += 17;

//   //   // Add Method
//   //   pdf.setFontSize(12);
//   //   pdf.setFont("helvetica", "normal");
//   //   pdf.text("Method:", 10, yPosition);
//   //   yPosition += 7;
//   //   pdf.setFont("helvetica", "courier");
//   //   pdf.text(currentValues.method, 10, yPosition);
//   //   yPosition += 17;

//   //   // Add Title
//   //   pdf.setFontSize(12);
//   //   pdf.setFont("helvetica", "normal");
//   //   pdf.text("Title:", 10, yPosition);
//   //   yPosition += 7;
//   //   pdf.setFont("helvetica", "courier");
//   //   pdf.text(currentValues.title, 10, yPosition);
//   //   yPosition += 17;

//   //   // Add Description (No indent, check overflow)
//   //   pdf.setFontSize(12);
//   //   pdf.setFont("helvetica", "normal");
//   //   pdf.text("Description:", 10, yPosition);
//   //   pdf.setFont("helvetica", "courier");
//   //   yPosition += 7;

//   //   const descriptionLines = pdf.splitTextToSize(
//   //     currentValues.description,
//   //     180
//   //   ); // Wrapping text for description
//   //   descriptionLines.forEach((line: string) => {
//   //     checkPageOverflow(); // Check for overflow before each line
//   //     pdf.text(line, 10, yPosition);
//   //     yPosition += 7;
//   //   });
//   //   yPosition += 10;

//   //   // Add Request Parameters
//   //   if (
//   //     currentValues.reqParams &&
//   //     Object.keys(currentValues.reqParams).length > 0
//   //   ) {
//   //     pdf.setFontSize(12);
//   //     pdf.setFont("helvetica", "normal");
//   //     pdf.text("Request Params:", 10, yPosition);

//   //     yPosition += 7;
//   //     Object.entries(currentValues.reqParams).forEach(([key, value]) => {
//   //       checkPageOverflow(); // Check for overflow before each param
//   //       pdf.setFont("helvetica", "courier");
//   //       pdf.text(`${key}: ${value}`, 10, yPosition);
//   //       yPosition += 7;
//   //     });
//   //   }
//   //   yPosition += 10;

//   //   // Add Request Body
//   //   if (
//   //     currentValues.reqBody &&
//   //     Object.keys(currentValues.reqBody).length > 0
//   //   ) {
//   //     pdf.setFontSize(12);
//   //     pdf.setFont("helvetica", "normal");
//   //     pdf.text("Request Body:", 10, yPosition);
//   //     pdf.setFont("SFMono-Regular.ttf", "SFMono", "normal");
//   //     yPosition += 7;
//   //     const reqBodyText = JSON.stringify(currentValues.reqBody, null, 2);
//   //     const reqBodyLines = pdf.splitTextToSize(reqBodyText, 180); // Wrapping text for request body
//   //     reqBodyLines.forEach((line: string) => {
//   //       checkPageOverflow(); // Check for overflow before each line
//   //       pdf.text(line, 10, yPosition);
//   //       yPosition += 7;
//   //     });
//   //   }
//   //   yPosition += 10;

//   //   // Add Response Body
//   //   if (currentValues.resBody) {
//   //     pdf.setFontSize(12);
//   //     pdf.setFont("helvetica", "normal");
//   //     pdf.text("Response Body:", 10, yPosition);
//   //     pdf.setFont("helvetica", "courier");
//   //     yPosition += 7;
//   //     const resBodyText = JSON.stringify(currentValues.resBody, null, 2);
//   //     const resBodyLines = pdf.splitTextToSize(resBodyText, 180); // Wrapping text for response body
//   //     resBodyLines.forEach((line: string) => {
//   //       checkPageOverflow(); // Check for overflow before each line
//   //       pdf.text(line, 10, yPosition);
//   //       yPosition += 7;
//   //     });
//   //   }
//   //   yPosition += 10;

//   //   // Save PDF
//   //   pdf.save("api-documentation.pdf");
//   // };

//   const generatePdf = async () => {
//     const pdf = new jsPDF();
//     // Add the font to the VFS
//     pdf.addFileToVFS("SFMono-Regular.ttf", base64Font);
//     let yPosition = 10; // Starting position for the content
//     const pageHeight = pdf.internal.pageSize.height;

//     // Utility function to check and add new page if overflow occurs
//     const checkPageOverflow = () => {
//       if (yPosition > pageHeight - 20) {
//         // 20px margin from bottom
//         pdf.addPage();
//         yPosition = 10; // Reset to top of the new page
//       }
//     };

//     // Loop through each API and add it to the PDF
//     apis.forEach((currentValues, apiIndex) => {
//       if (apiIndex > 0) {
//         pdf.addPage(); // Add new page for each new API
//         yPosition = 10; // Reset yPosition for each API
//       }

//       // Add Title
//       pdf.setFontSize(16);
//       pdf.setFont("helvetica", "bold");
//       pdf.text("API Documentation", 10, yPosition);
//       yPosition += 17;

//       // Add URL
//       pdf.setFontSize(12);
//       pdf.setFont("helvetica", "normal");
//       pdf.text("URL:", 10, yPosition);
//       yPosition += 7;
//       pdf.setFont("helvetica", "courier");
//       pdf.text(currentValues.url, 10, yPosition);
//       yPosition += 17;

//       // Add Method
//       pdf.setFontSize(12);
//       pdf.setFont("helvetica", "normal");
//       pdf.text("Method:", 10, yPosition);
//       yPosition += 7;
//       pdf.setFont("helvetica", "courier");
//       pdf.text(currentValues.method, 10, yPosition);
//       yPosition += 17;

//       // Add Title
//       pdf.setFontSize(12);
//       pdf.setFont("helvetica", "normal");
//       pdf.text("Title:", 10, yPosition);
//       yPosition += 7;
//       pdf.setFont("helvetica", "courier");
//       pdf.text(currentValues.title, 10, yPosition);
//       yPosition += 17;

//       // Add Description (No indent, check overflow)
//       pdf.setFontSize(12);
//       pdf.setFont("helvetica", "normal");
//       pdf.text("Description:", 10, yPosition);
//       pdf.setFont("helvetica", "courier");
//       yPosition += 7;

//       const descriptionLines = pdf.splitTextToSize(
//         currentValues.description,
//         180
//       ); // Wrapping text for description
//       descriptionLines.forEach((line: string) => {
//         checkPageOverflow(); // Check for overflow before each line
//         pdf.text(line, 10, yPosition);
//         yPosition += 7;
//       });
//       yPosition += 10;

//       // Add Request Parameters
//       if (
//         currentValues.reqParams &&
//         Object.keys(currentValues.reqParams).length > 0
//       ) {
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         pdf.text("Request Params:", 10, yPosition);
//         yPosition += 7;
//         Object.entries(currentValues.reqParams).forEach(([key, value]) => {
//           checkPageOverflow(); // Check for overflow before each param
//           pdf.setFont("helvetica", "courier");
//           pdf.text(`${key}: ${value}`, 10, yPosition);
//           yPosition += 7;
//         });
//       }
//       yPosition += 10;

//       // Add Request Body
//       if (
//         currentValues.reqBody &&
//         Object.keys(currentValues.reqBody).length > 0
//       ) {
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         pdf.text("Request Body:", 10, yPosition);
//         pdf.setFont("SFMono-Regular.ttf", "SFMono", "normal");
//         yPosition += 7;
//         const reqBodyText = JSON.stringify(currentValues.reqBody, null, 2);
//         const reqBodyLines = pdf.splitTextToSize(reqBodyText, 180); // Wrapping text for request body
//         reqBodyLines.forEach((line: string) => {
//           checkPageOverflow(); // Check for overflow before each line
//           pdf.text(line, 10, yPosition);
//           yPosition += 7;
//         });
//       }
//       yPosition += 10;

//       // Add Response Body
//       if (currentValues.resBody) {
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         pdf.text("Response Body:", 10, yPosition);
//         pdf.setFont("helvetica", "courier");
//         yPosition += 7;
//         const resBodyText = JSON.stringify(currentValues.resBody, null, 2);
//         const resBodyLines = pdf.splitTextToSize(resBodyText, 180); // Wrapping text for response body
//         resBodyLines.forEach((line: string) => {
//           checkPageOverflow(); // Check for overflow before each line
//           pdf.text(line, 10, yPosition);
//           yPosition += 7;
//         });
//       }
//       yPosition += 10;
//     });

//     // Save PDF
//     pdf.save("api-documentation.pdf");
//   };

//   const currentValues = form.getValues();

//   const handleCreateNewApi = () => {
//     form.reset({
//       url: "",
//       title: "",
//       description: "",
//       method: "GET",
//       reqParams: {
//         key: "value",
//       },
//       resBody: {
//         status: 200,
//         data: {},
//       },
//       reqBody: {},
//     });
//   };

//   return (
//     <div className="flex mx-auto max-h-screen ">
//       <section className="flex flex-col items-start justify-start w-1/2 ">
//         <ApiForm form={form} onSubmit={onSubmit} />
//       </section>

//       <section className="flex flex-col items-start justify-start w-1/2  p-4">
//         <div className="px-4 flex flex-row justify-between items-center w-full">
//           <h1 className="text-2xl text-slate-700 font-bold">
//             Api Documentation {currentApiIndex + 1} / {apis.length}
//           </h1>
//           <div>
//             <Button onClick={handleCreateNewApi}>Create New API</Button>
//             <Button onClick={generatePdf}>Generate PDF</Button>
//           </div>
//         </div>
//         <br />
//         {/* {currentValues && <Preview data={apis[currentApiIndex]} />} */}

//         <br />
//         {apis.length > 0 && (
//           <div>
//             <h2 className="text-xl font-bold">Created APIs</h2>
//             <ul>
//               {apis.map((api, index) => (
//                 <li key={index}>
//                   <Preview data={api} />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default CreateNewApiDoc;

"use client";

import ApiForm from "@/components/ApiForm";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { base64Font } from "@/constants/fontFamily";

// Validator for the response body
const resBodyValidator = z.object({
  status: z.number(),
  data: z.union([z.record(z.string()), z.array(z.unknown())]).optional(),
});

const formSchema = z
  .object({
    url: z.string().url(),
    title: z.string(),
    description: z.string(),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    reqParams: z.record(z.string()).optional(),
    resBody: resBodyValidator,
    reqBody: z.union([z.record(z.unknown()), z.array(z.unknown())]).optional(),
  })
  .refine(
    (data) => {
      if (["GET", "DELETE"].includes(data.method) && !data.reqParams) {
        return false;
      }
      if (["PUT", "PATCH"].includes(data.method) && !data.reqBody) {
        return false;
      }
      return true;
    },
    {
      message: "Invalid combination of HTTP method and parameters or body.",
      path: [],
    }
  );

export type FormData = z.infer<typeof formSchema>;

const CreateNewApiDoc = () => {
  const [apis, setApis] = useState<FormData[]>([]); // Store APIs
  const [currentApiIndex, setCurrentApiIndex] = useState<number>(0); // Track current API

  const onSubmit = (values: FormData) => {
    // Add the current form values to the apiDocs array
    setApis((prevApiDocs: FormData[]) => [...prevApiDocs, values]);

    // Reset form after submission to clear the inputs
    form.reset({
      url: "",
      title: "",
      description: "",
      method: "GET",
      reqParams: {
        key: "value",
      },
      resBody: {
        status: 200,
        data: {},
      },
      reqBody: {},
    });
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      method: "GET",
      reqParams: {
        key: "value",
      },
      resBody: {
        // status: 200,
        // data: {},
      },
      reqBody: {},
    },
  });

  const generatePdf = async () => {
    const pdf = new jsPDF();
    // Add the font to the VFS
    pdf.addFileToVFS("SFMono-Regular.ttf", base64Font);
    let yPosition = 10; // Starting position for the content
    const pageHeight = pdf.internal.pageSize.height;

    // Utility function to check and add new page if overflow occurs
    const checkPageOverflow = () => {
      if (yPosition > pageHeight - 20) {
        // 20px margin from bottom
        pdf.addPage();
        yPosition = 10; // Reset to top of the new page
      }
    };

    // Loop through each API and add it to the PDF
    apis.forEach((currentValues, apiIndex) => {
      if (apiIndex > 0) {
        pdf.addPage(); // Add new page for each new API
        yPosition = 10; // Reset yPosition for each API
      }

      // Add Title
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text("API Documentation", 10, yPosition);
      yPosition += 17;

      // Add URL
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("URL:", 10, yPosition);
      yPosition += 7;
      pdf.setFont("helvetica", "courier");
      pdf.text(currentValues.url, 10, yPosition);
      yPosition += 17;

      // Add Method
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Method:", 10, yPosition);
      yPosition += 7;
      pdf.setFont("helvetica", "courier");
      pdf.text(currentValues.method, 10, yPosition);
      yPosition += 17;

      // Add Title
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Title:", 10, yPosition);
      yPosition += 7;
      pdf.setFont("helvetica", "courier");
      pdf.text(currentValues.title, 10, yPosition);
      yPosition += 17;

      // Add Description (No indent, check overflow)
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Description:", 10, yPosition);
      pdf.setFont("helvetica", "courier");
      yPosition += 7;

      const descriptionLines = pdf.splitTextToSize(
        currentValues.description,
        180
      ); // Wrapping text for description
      descriptionLines.forEach((line: string) => {
        checkPageOverflow(); // Check for overflow before each line
        pdf.text(line, 10, yPosition);
        yPosition += 7;
      });
      yPosition += 10;

      // Add Request Parameters
      if (
        currentValues.reqParams &&
        Object.keys(currentValues.reqParams).length > 0
      ) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.text("Request Params:", 10, yPosition);
        yPosition += 7;
        Object.entries(currentValues.reqParams).forEach(([key, value]) => {
          checkPageOverflow(); // Check for overflow before each param
          pdf.setFont("helvetica", "courier");
          pdf.text(`${key}: ${value}`, 10, yPosition);
          yPosition += 7;
        });
      }
      yPosition += 10;

      // Add Request Body
      if (
        currentValues.reqBody &&
        Object.keys(currentValues.reqBody).length > 0
      ) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.text("Request Body:", 10, yPosition);
        pdf.setFont("SFMono-Regular.ttf", "SFMono", "normal");
        yPosition += 7;
        const reqBodyText = JSON.stringify(currentValues.reqBody, null, 2);
        const reqBodyLines = pdf.splitTextToSize(reqBodyText, 180); // Wrapping text for request body
        reqBodyLines.forEach((line: string) => {
          checkPageOverflow(); // Check for overflow before each line
          pdf.text(line, 10, yPosition);
          yPosition += 7;
        });
      }
      yPosition += 10;

      // Add Response Body
      if (currentValues.resBody) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.text("Response Body:", 10, yPosition);
        pdf.setFont("helvetica", "courier");
        yPosition += 7;
        const resBodyText = JSON.stringify(currentValues.resBody, null, 2);
        const resBodyLines = pdf.splitTextToSize(resBodyText, 180); // Wrapping text for response body
        resBodyLines.forEach((line: string) => {
          checkPageOverflow(); // Check for overflow before each line
          pdf.text(line, 10, yPosition);
          yPosition += 7;
        });
      }
      yPosition += 10;
    });

    // Save PDF
    pdf.save("api-documentation.pdf");
  };

  // const currentValues = form.getValues();

  const handleCreateNewApi = () => {
    // First, submit the current form data (if it's valid)
    form.handleSubmit(onSubmit)();

    form.reset({
      url: "",
      title: "",
      description: "",
      method: "GET",
      reqParams: {
        key: "value",
      },
      resBody: {
        // status: 200,
        // data: {}, // Clear data object inside resBody
      },
      reqBody: {},
    });
    setCurrentApiIndex(apis.length); // Move to the next API index when a new API is created
  };

  return (
    <div className="xl:w-[1200px] flex justify-start items-start flex-col mx-auto h-screen overflow-auto scroll scroll-m-0 remove-scrollbar">
      <div className="flex flex-row justify-between items-center w-full p-4">
        <h1 className="text-3xl text-black-700 font-extrabold">
          Api Documentation
        </h1>
        <div className="flex gap-4 justify-end items-center flex-row">
          <Button onClick={handleCreateNewApi}>Add New API</Button>
          <Button onClick={generatePdf}>Generate PDF</Button>
        </div>
      </div>
      <div className="flex justify-between w-full mb-4 p-4 border-b-2 border-slate-500">
        <Button
          disabled={currentApiIndex === 0} // Disable if it's the first API
          onClick={() => setCurrentApiIndex(currentApiIndex - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={currentApiIndex >= apis.length} // Disable if it's the last API
          onClick={() => setCurrentApiIndex(currentApiIndex + 1)}
        >
          Next
        </Button>
      </div>

      <div className="flex justify-around w-full">
        <section className="flex flex-col items-start justify-start w-1/2">
          <ApiForm form={form} onSubmit={onSubmit} />
        </section>

        <section className="flex flex-col items-start justify-start w-1/2 px-4">
          {/* Display the Current API */}
          {apis.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold px-4">
                Created APIs: {currentApiIndex + 1} / {apis.length}
              </h2>
              <ul>
                <li>
                  <Preview data={apis[currentApiIndex]} />{" "}
                  {/* Show the current API */}
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-start w-full p-7">
              <h2 className="text-2xl font-bold px-4">No APIs created yet</h2>
              <p className="text-slate-500 p-4">
                Start filling the form and submit to see preview.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CreateNewApiDoc;
