"use server";

export async function validatePostcode(postcode: string): Promise<boolean> {
  console.log("validatePostcode on SERVER", postcode);
  return postcode.startsWith("4");
}
