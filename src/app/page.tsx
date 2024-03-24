import RegistrationForm from "./RegistrationForm";
import { SchemaType, ServerActionResponse, schema } from "./registrationSchema";

export default function Home() {
  async function onDataAction(data: SchemaType) {
    "use server";
    const parsed = schema.safeParse(data);
    if (parsed.success) {
      // TODO: add data to db
      return { message: "User regisiterd", user: parsed.data };
    }

    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  async function onFormAction(
    prevState: ServerActionResponse,
    formData: FormData
  ) {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = await schema.safeParseAsync(data);
    if (parsed.success) {
      // TODO: add data to db
      return { message: "User regisiterd", user: parsed.data };
    }

    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm
        onDataAction={onDataAction}
        onFormAction={onFormAction}
      />
    </div>
  );
}
