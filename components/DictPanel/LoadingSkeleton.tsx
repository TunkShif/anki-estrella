const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 p-2">
      <div className="h-6 w-16 animate-pulse rounded-sm bg-gray-200"></div>
      <div className="h-6 w-96 animate-pulse rounded-sm bg-gray-100"></div>
      <div className="h-6 w-96 animate-pulse rounded-sm bg-gray-100"></div>
      <div className="h-6 w-[440px] animate-pulse rounded-sm bg-gray-100"></div>
      <div className="h-6 w-[440px] animate-pulse rounded-sm bg-gray-100"></div>
      <div className="h-6 w-[440px] animate-pulse rounded-sm bg-gray-200"></div>
      <div className="h-6 w-96 animate-pulse rounded-sm bg-gray-100"></div>
      <div className="h-6 w-[440px] animate-pulse rounded-sm bg-gray-100"></div>
      <div className="h-6 w-[440px] animate-pulse rounded-sm bg-gray-100"></div>
      <div className="h-6 w-[440px] animate-pulse rounded-sm bg-gray-200"></div>
    </div>
  )
}

export default LoadingSkeleton
