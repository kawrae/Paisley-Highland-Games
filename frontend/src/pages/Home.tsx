export default function Home() {
  return (
    <section className="flex flex-col items-center text-center py-20 bg-gradient-to-b from-green-100 to-white">
      <h1 className="text-5xl font-extrabold text-green-800 mb-4">Welcome to the Paisley Highland Games</h1>
      <p className="max-w-2xl text-gray-700 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at arcu purus. Etiam dapibus lectus neque, et mattis dolor varius ut.
      </p>
      <a href="/register" className="px-6 py-3 rounded-full bg-green-700 text-white hover:bg-green-800 transition">
        Register to Compete
      </a>
    </section>
  )
}
