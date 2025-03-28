import { NEXT_AUTH_CONFIG } from "@/public/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(NEXT_AUTH_CONFIG);

export { handler as GET, handler as POST };
