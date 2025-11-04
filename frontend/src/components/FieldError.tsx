export default function FieldError({ msg }: { msg?: string }) {
  return (
    <p
      aria-live="polite"
      className={`mt-1 h-5 text-sm leading-5 transition-opacity duration-200 ${
        msg ? "opacity-100 text-red-600" : "opacity-0 text-transparent"
      }`}
    >
      {msg ?? "placeholder"}
    </p>
  )
}
