import next from 'next';
import { NextRequest, NextResponse } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request.url;

  if((pathname=== '/dashboard' || pathname === '/carrito') && !request.cookies.get('userSession')?.value) {

  } else {
    return NextResponse.next();
  }
} 
 
