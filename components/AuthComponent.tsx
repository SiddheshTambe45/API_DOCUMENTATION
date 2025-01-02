"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useState } from "react";
import OTPhandler from "./OTPhandler";

const authformSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email({
      message: "Enter a valid email address.",
    }),
    userName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

type FormType = "sign-up" | "sign-in";

const AuthComponent = ({ type }: { type: FormType }) => {
  const [accountID, setAccountID] = useState<string | null>("");

  const formSchema = authformSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      userName: "",
    },
  });

  console.log(type);

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    try {
      console.log("this comes too");

      const user =
        type === "sign-up"
          ? await signUp({
              userName: values.userName || "",
              email: values.email,
            })
          : await signIn({
              email: values.email,
            });

      console.log("this comes");

      setAccountID(user.accountID);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <h2 className="font-bold text-3xl">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h2>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="max-w-[500px] max-h-[500px] w-full flex flex-col justify-center gap-4"
        >
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full">User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center flex-row">
            <Button type="submit" className="max-w-[150px]">
              Submit
            </Button>
          </div>
        </form>
      </Form>

      {accountID && (
        <OTPhandler email={form.getValues("email")} accountID={accountID} />
      )}
    </>
  );
};

export default AuthComponent;
