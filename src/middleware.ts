import { NextRequest, NextResponse  } from 'next/server'
 

export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname;
   const isPublicPath = '/' === path || '/signup' === path ||  '/login' === path || '/verifyemail' === path
   
   //get the token value from the page if available
   const token = request.cookies.get("token")?.value || ''
   

   //if authenticated or with token remain in profile page
   if(isPublicPath && token ){
      return NextResponse.redirect(new URL('/profile', request.nextUrl))
   }
   
   //if not authenticated nor without token no access to profile
   if(!isPublicPath && !token){
     return NextResponse.redirect(new URL('/', request.nextUrl))
   }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ],
}