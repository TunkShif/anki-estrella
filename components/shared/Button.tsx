import { ReactElement } from "react"

type ButtonProps = {
  icon: ReactElement
  label: string
  onClick: () => void
}

const Button = ({ icon, label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-gray-600 shadow-sm transition duration-300 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300 dark:bg-slate-800 dark:text-slate-400 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 dark:hover:bg-slate-700"
    >
      {icon}
      <span className="font-bold">{label}</span>
    </button>
  )
}

export default Button
