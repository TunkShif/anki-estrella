import Image from "next/image"

const NotFound = () => {
  return (
    <div className="flex select-none flex-col items-center justify-center space-y-6 py-24">
      <Image
        src="/svg/undraw_alert.svg"
        alt="Alert Illustration"
        width={220}
        height={200}
      />
      <span className="font-display text-sm text-gray-400">
        Sorry, cannot find the word
      </span>
    </div>
  )
}

export default NotFound
