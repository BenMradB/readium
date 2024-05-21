import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  "/edit-story(.*)",
  "/notifications",
  "/profile(.*)",
  "/settings",
  "/stories",
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
