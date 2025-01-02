"use client";

import ApiForm from "@/components/ApiForm";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Preview from "@/components/Preview";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";

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
    reqBody: z.union([z.record(z.string()), z.array(z.unknown())]).optional(),
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
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      method: "GET",
      reqParams: {},
      resBody: {
        status: 200,
      },
      reqBody: {},
    },
  });

  const onSubmit = (values: FormData) => {
    console.log("Form submitted with values: ", values);
  };

  // Access current values of the form
  const currentValues = form.getValues();

  const generatePdf = () => {
    const doc = new jsPDF();

    // Set up content area (adjust as needed)
    const content = document.querySelector("#previewContent");

    if (content) {
      // You can scale the content to fit better within the page
      doc.html(content as HTMLElement, {
        margin: [10, 5, 20, 5],
        autoPaging: true,
        callback: function (doc) {
          // Save the PDF
          doc.save("api_documentation.pdf");
        },
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.2, // Scale down the content for better fitting
          logging: true, // Enable logging to debug the canvas rendering
          useCORS: true, // Allow cross-origin resources
        },
      });
    }
  };

  return (
    <div className="flex mx-auto max-h-screen ">
      <section className="flex flex-col items-start justify-start w-1/2 ">
        <ApiForm form={form} onSubmit={onSubmit} />
      </section>

      <section className="flex flex-col items-start justify-start w-1/2  p-4">
        <div className="px-4 flex flex-row justify-between items-center w-full">
          <h1 className="text-2xl text-slate-700 font-bold">
            Api Documentation
          </h1>
          {/* Button to trigger PDF generation */}
          <Button onClick={generatePdf} className="">
            Generate PDF
          </Button>
        </div>
        <br />
        <Preview data={currentValues} />
      </section>
    </div>
  );
};

export default CreateNewApiDoc;
