import { createRouteMatcher, clerkMiddleware } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  "/",
  "/settings",
  "/stories",
  "/edit-story(.*)",
  "/profile(.*)",
  "notifications",
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
