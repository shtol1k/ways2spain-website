import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/static') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    try {
        const response = await fetch(`${request.nextUrl.origin}/api/globals/site-settings?depth=0`, {
            next: { revalidate: 60 },
        })

        if (response.ok) {
            const settings = await response.json()
            const maintenanceEnabled = settings?.maintenance?.enabled

            if (maintenanceEnabled) {
                const payloadToken = request.cookies.get('payload-token')

                if (!payloadToken && pathname !== '/coming-soon') {
                    return NextResponse.redirect(new URL('/coming-soon', request.url))
                }
            } else {
                if (pathname === '/coming-soon') {
                    return NextResponse.redirect(new URL('/', request.url))
                }
            }
        }
    } catch (error) {
        // Fail open - allow access if settings fetch fails
        console.error('Proxy maintenance check failed:', error)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|admin|favicon.ico).*)',
    ],
}
