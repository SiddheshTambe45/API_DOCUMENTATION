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
        className="w-full px-4 flex flex-col gap-2"
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

        {/*
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
        */}

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

                            // Check if the key already exists in reqParams
                            if (
                              newKey &&
                              Object.hasOwnProperty.call(
                                newReqParams,
                                newKey
                              ) &&
                              newKey !== key
                            ) {
                              // If the new key is already in reqParams, set an error and stop the change
                              form.setError("reqParams", {
                                type: "manual",
                                message: `Key "${newKey}" already exists.`,
                              });
                              return; // Prevent updating the key if it's already present
                            }

                            // If no error, update the key dynamically
                            delete newReqParams[key]; // Remove old key if changed
                            newReqParams[newKey] = value; // Add the new key
                            field.onChange(newReqParams); // Update the form state
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
                            field.onChange(newReqParams); // Update value without modifying the keys
                          }}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const newReqParams = { ...field.value };
                            delete newReqParams[key]; // Delete the parameter
                            field.onChange(newReqParams); // Update form state
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
                      // Add new empty param ("" as the key and "" as the value)
                      const newReqParams = { ...field.value, "": "" };
                      field.onChange(newReqParams); // Update form state with new empty param
                    }}
                  >
                    Add Parameter
                  </Button>
                </div>
              </FormControl>
              {/* Display error if a duplicate key exists */}
              {/* Display error if a duplicate key exists */}
              {form.formState.errors.reqParams?.message && (
                <FormMessage>
                  {form.formState.errors.reqParams.message}
                </FormMessage>
              )}
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
