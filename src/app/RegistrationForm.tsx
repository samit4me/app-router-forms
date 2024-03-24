"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  defaultValues,
  schema,
  SchemaType,
  ServerActionResponse,
} from "./registrationSchema";
import React from "react";

export default function RegistrationForm({
  onDataAction,
  onFormAction,
}: {
  // Server Action - Data
  onDataAction?: (data: SchemaType) => Promise<ServerActionResponse>;

  // Server Action - FormData
  onFormAction: (
    prevState: ServerActionResponse,
    formData: FormData
  ) => Promise<ServerActionResponse>;
}) {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues({ first: "bob" }),
  });

  const [state, formAction] = useFormState(onFormAction, { message: "" });
  const formRef = React.useRef<HTMLFormElement>(null);

  // async function onSubmit(data: SchemaType) {
  //   const formData = new FormData();
  //   Object.entries(data).forEach(([name, value]) => {
  //     formData.append(name, value);
  //   });

  //   // API - Next Route Handler - JSON verions
  //   // fetch("/api/register", {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify(data),
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => console.log("### data", data));

  //   // API - Next Route Handler - FormData version
  //   // fetch("/api/registerForm", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => console.log("### data", data));

  //   // Serve Action - Data
  //   // console.log("#####", await onDataAction(data));

  //   // Serve Action - FormData
  //   // console.log("#####", await onFormAction(formData));
  // }

  return (
    <Form {...form}>
      {!!state.message && <div>{state.message}</div>}
      {!!state.issues?.length && (
        <ul>
          {state.issues.map((issue) => (
            <li key="issue">{issue}</li>
          ))}
        </ul>
      )}
      <form
        ref={formRef}
        className="space-y-8"
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                {!form.formState.errors.first && (
                  <FormDescription>Your first name.</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                {!form.formState.errors.last && (
                  <FormDescription>Your last name.</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {!form.formState.errors.email && (
                <FormDescription>Your email address.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Postcode</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {!form.formState.errors.postcode && (
                <FormDescription>Your postcode.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
