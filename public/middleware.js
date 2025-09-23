import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();
  res.headers.set("Accept-Ranges", "none"); // evita RangeNotSatisfiableError
  return res;
}
