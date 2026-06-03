interface LogoProps {
  className?: string
  typeClassName?: string
}

export default function Logo({ className = '', typeClassName = '' }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/Logo0.png"
        alt="Bleak's Solutions"
        className={className}
      />
      <span
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        className={`font-bold uppercase tracking-wide text-foreground leading-none ${typeClassName}`}
      >
        Bleak's Solutions
      </span>
    </div>
  )
}
