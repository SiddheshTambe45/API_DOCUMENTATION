// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "./ui/textarea";
// import JSONEditor from "./JSONEditor";

// // Validator for the response body, which may include status along with key-value pairs
// const resBodyValidator = z.object({
//   status: z.number(),
//   data: z.union([z.record(z.string()), z.array(z.any())]).optional(), // Data is optional, it can be an object with key-value pairs
// });

// const formSchema = z
//   .object({
//     url: z.string().url(),
//     title: z.string(),
//     description: z.string(),
//     method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
//     reqParams: z.record(z.string()).optional(), // Optional for methods like PUT/PATCH
//     resBody: resBodyValidator,
//     // reqBody: z.record(z.string()).optional(), // Optional for methods like GET/DELETE
//     reqBody: z.union([z.record(z.string()), z.array(z.any())]).optional(), // Allows both objects and arrays
//   })
//   .refine(
//     (data) => {
//       // If the method is GET or DELETE, reqParams must be provided
//       if (["GET", "DELETE"].includes(data.method) && !data.reqParams) {
//         return false;
//       }
//       // If the method is PUT or PATCH, reqBody must be provided
//       if (["PUT", "PATCH"].includes(data.method) && !data.reqBody) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: "Invalid combination of HTTP method and parameters or body.",
//       path: [], // This applies to the entire object
//     }
//   );

// export default function ApiForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       url: "http://localhost:3000/api/blogs/123",
//       title: "",
//       description: "",
//       method: "GET",
//       reqParams: {},
//       resBody: {
//         status: 200,
//       },
//       reqBody: {},
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log("My values submitted: ", values);
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full p-4 flex flex-col gap-2"
//       >
//         <FormField
//           control={form.control}
//           name="url"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full font-bold text-xl">URL</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="http://localhost:3000/api/blogs/123"
//                   {...field}
//                   className="w-full"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* <FormField
//           control={form.control}
//           name="method"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full">Method</FormLabel>
//               <FormControl>
//                 <Select>
//                   <SelectTrigger {...field} className="w-full">
//                     <SelectValue placeholder="GET" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="GET">GET</SelectItem>
//                     <SelectItem value="POST">POST</SelectItem>
//                     <SelectItem value="PUT">PUT</SelectItem>
//                     <SelectItem value="DELETE">DELETE</SelectItem>
//                     <SelectItem value="SYSTEM">PATCH</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}

//         <FormField
//           control={form.control}
//           name="method"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full font-bold text-xl">Method</FormLabel>
//               <FormControl>
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="GET" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="GET">GET</SelectItem>
//                     <SelectItem value="POST">POST</SelectItem>
//                     <SelectItem value="PUT">PUT</SelectItem>
//                     <SelectItem value="PATCH">PATCH</SelectItem>
//                     <SelectItem value="DELETE">DELETE</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full font-bold text-xl">Title</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="API for fetching blog with blogID"
//                   {...field}
//                   className="w-full"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full font-bold text-xl">
//                 Description
//               </FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Fetches blog dynamically based on blogID. The response comes as object with key-value pairs about blog data...."
//                   {...field}
//                   className="w-full"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="reqParams"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full font-bold text-xl">
//                 Request Parameters
//               </FormLabel>
//               <FormControl>
//                 <div className="space-y-2">
//                   {Object.entries(field.value || {}).map(
//                     ([key, value], index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         <Input
//                           placeholder="Key"
//                           value={key}
//                           onChange={(e) => {
//                             const newReqParams = { ...field.value };
//                             const newKey = e.target.value;
//                             if (newKey !== key) {
//                               delete newReqParams[key];
//                               newReqParams[newKey] = value;
//                               field.onChange(newReqParams);
//                             }
//                           }}
//                           className="flex-1"
//                         />
//                         <Input
//                           placeholder="Value"
//                           value={value}
//                           onChange={(e) => {
//                             const newReqParams = {
//                               ...field.value,
//                               [key]: e.target.value,
//                             };
//                             field.onChange(newReqParams);
//                           }}
//                           className="flex-1"
//                         />
//                         <Button
//                           type="button"
//                           onClick={() => {
//                             const newReqParams = { ...field.value };
//                             delete newReqParams[key];
//                             field.onChange(newReqParams);
//                           }}
//                         >
//                           X
//                         </Button>
//                       </div>
//                     )
//                   )}
//                   <Button
//                     type="button"
//                     onClick={() => {
//                       const newReqParams = { ...field.value, "": "" };
//                       field.onChange(newReqParams);
//                     }}
//                   >
//                     Add Parameter
//                   </Button>
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Integrate JSONEditor */}
//         <FormField
//           control={form.control}
//           name="reqBody"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full font-bold text-xl">
//                 Request Body (JSON)
//               </FormLabel>
//               <FormControl>
//                 <JSONEditor
//                   value={field.value || {} || []}
//                   handleChange={field.onChange}
//                   type="reqBody"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Integrate JSONEditor */}
//         <FormField
//           control={form.control}
//           name="resBody"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="w-full font-bold text-xl">
//                 Response Body (JSON)
//               </FormLabel>
//               <FormControl>
//                 <JSONEditor
//                   value={field.value || {} || []}
//                   handleChange={field.onChange}
//                   type="resBody"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import JSONEditor from "./JSONEditor";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/app/(root)/create-new-api/page";

type ApiFormProps = {
  form: UseFormReturn<FormData>; // Will use FormData as inferred type from above page
  onSubmit: (values: FormData) => void;
};

export default function ApiForm1({ form, onSubmit }: ApiFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-4 flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full font-bold text-xl">URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="http://localhost:3000/api/blogs/123"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full font-bold text-xl">Method</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="GET" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full font-bold text-xl">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="API for fetching blog with blogID"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full font-bold text-xl">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Fetches blog dynamically based on blogID. The response comes as object with key-value pairs about blog data...."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reqParams"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full font-bold text-xl">
                Request Parameters
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {Object.entries(field.value || {}).map(
                    ([key, value], index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder="Key"
                          value={key}
                          onChange={(e) => {
                            const newReqParams = { ...field.value };
                            const newKey = e.target.value;
                            if (newKey !== key) {
                              delete newReqParams[key];
                              newReqParams[newKey] = value;
                              field.onChange(newReqParams);
                            }
                          }}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Value"
                          value={value}
                          onChange={(e) => {
                            const newReqParams = {
                              ...field.value,
                              [key]: e.target.value,
                            };
                            field.onChange(newReqParams);
                          }}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const newReqParams = { ...field.value };
                            delete newReqParams[key];
                            field.onChange(newReqParams);
                          }}
                        >
                          X
                        </Button>
                      </div>
                    )
                  )}
                  <Button
                    type="button"
                    onClick={() => {
                      const newReqParams = { ...field.value, "": "" };
                      field.onChange(newReqParams);
                    }}
                  >
                    Add Parameter
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* JSON Editor for Request Body */}
        <FormField
          control={form.control}
          name="reqBody"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full font-bold text-xl">
                Request Body (JSON)
              </FormLabel>
              <FormControl>
                <JSONEditor
                  value={field.value || {}}
                  handleChange={field.onChange}
                  type="reqBody"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* JSON Editor for Response Body */}
        <FormField
          control={form.control}
          name="resBody"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full font-bold text-xl">
                Response Body (JSON)
              </FormLabel>
              <FormControl>
                <JSONEditor
                  value={field.value || {}}
                  handleChange={field.onChange}
                  type="resBody"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
