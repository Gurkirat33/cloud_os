"use server";

import { prisma } from "@/lib/prisma";
import { createPinSchema, signInSchema, signUpSchema } from "../validators";
import { auth, signIn } from "@/auth";
import { hashSync } from "bcrypt-ts-edge";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signupUser(prevState: unknown, formData: FormData) {
  console.log("getting called");
  console.log(formData);
  console.log(formData.get("name"));
  console.log(formData.get("email"));
  console.log(formData.get("password"));
  try {
    const validatedFields = signUpSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log(validatedFields);
    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = hashSync(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/pin",
    });

    return { success: true, message: "User created successfully" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Something went wrong" };
  }
}

export async function signInUser(prevState: unknown, formData: FormData) {
  try {
    const validatedFields = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password } = validatedFields.data;
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/pin",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Something went wrong" };
  }
}

export async function createPin(prevState: unknown, formData: FormData) {
  console.log("createPin calling");
  console.log(formData);
  console.log(formData.get("pin"));
  console.log(formData.get("confirmPin"));
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }
    const validatedFields = createPinSchema.safeParse({
      pin: formData.get("pin"),
      confirmPin: formData.get("confirmPin"),
    });
    console.log("fields are ok", validatedFields);
    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }
    const { pin } = validatedFields.data;
    const hashedPin = hashSync(pin.toString(), 10);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { pin: hashedPin },
    });

    return {
      success: true,
      message: "PIN created successfully",
      pin: hashedPin,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error.name);
    console.log(error.message);

    return { success: false, message: "Something went wrong" };
  }
}
