import { NextRequest, NextResponse } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if((pathname === '/dashboard' || pathname === '/carrito') && !request.cookies.get('userSession')?.value) {
    return NextResponse.redirect(new URL('/', request.url))
  } else {
    return NextResponse.next();
  }
} 
 
