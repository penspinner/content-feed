import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import './css/tailwind.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Nav />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  return <div>An error occurred while loading the page.</div>
}

export default function Root() {
  return <Outlet />
}

function Nav() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center text-white">
              <Link to="/">Content Feed</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
