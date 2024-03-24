import { z } from "zod";
import { validatePostcode } from "./validatePostcode";
import { DeepPartial } from "react-hook-form";

export const schema = z.object({
  first: z.string().trim().min(1, { message: "First name is required." }),
  last: z.string().trim().min(1, { message: "Last name is required." }),
  email: z.string().trim().email({ message: "Invalid email address." }),
  postcode: z
    .string()
    .refine(validatePostcode, { message: "Invalid postcode" }),
});

export type SchemaType = z.infer<typeof schema>;

export type ServerActionResponse = {
  message: string;
  user?: SchemaType;
  issues?: string[];
};

export function defaultValues(values: DeepPartial<SchemaType>) {
  return async function (): Promise<SchemaType> {
    return {
      first: "",
      last: "",
      email: "",
      postcode: "",
      ...values,
    };
  };
}
