import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { RegisterParams } from "@/types/server.actions.params";
import { register } from "@/lib/actions/user/user.create.action";
import { NextResponse } from "next/server";
import { deleteUserByClerkId } from "@/lib/actions/user/user.delete.action";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name, image_url } =
      evt.data;

    const newUser: RegisterParams = {
      clerkId: id,
      username: username ?? `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      firstname: first_name!,
      lastname: last_name!,
      avatar: image_url,
    };

    // Call the register function
    const { statusCode, message, data } = await register(newUser);
    console.log(
      "Status Code : ",
      statusCode,
      "Message : ",
      message,
      "New User : ",
      data
    );

    return NextResponse.json({
      statusCode,
      message,
      data,
    });
  }

  if (eventType === "user.deleted") {
    console.log("DELETE USER EVT: ", id);
    const { statusCode, message, data } = await deleteUserByClerkId(id!);
    console.log(
      "Status Code : ",
      statusCode,
      "Message : ",
      message,
      "New User : ",
      data
    );

    return NextResponse.json({
      statusCode,
      message,
      data,
    });
  }
}
