import Navbar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="container-page py-6 text-sm text-gray-500">© Paisley Highland Games</div>
      </footer>
    </div>
  )
}
