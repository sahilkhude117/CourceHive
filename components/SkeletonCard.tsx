import { Skeleton } from "@/components/ui/skeleton"
import { Share2 } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"

export function HomeSkeleton() {
  return (
    <div className="flex flex-col space-y-3 mt-2">
      <Skeleton className="h-5 w-[150px] rounded-xl bg-gray-100" />
      <div className="flex justify-between gap-4 ">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-100" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-100" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-100" />   
      </div>
      <Skeleton className="h-5 w-[150px] rounded-xl bg-gray-100" /> 
      <div className="flex justify-between gap-4 ">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-100" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-100" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-100" />   
      </div>
    </div>
  )
}

export function CoursesSkeleton() {
    return (<div>
      <div className="flex flex-col space-y-3">
        <div className="flex">
          <Skeleton className="h-[150px] w-[120px] rounded-xl bg-gray-100 m-1" />
          <div>
            <Skeleton className="h-[100px] w-[300px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[10px] w-[100px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[30px] w-[250px] rounded-xl bg-gray-100 m-1" />
          </div>
        </div>

        <div className="flex">
          <Skeleton className="h-[150px] w-[120px] rounded-xl bg-gray-100 m-1" />
          <div>
            <Skeleton className="h-[100px] w-[300px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[10px] w-[100px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[30px] w-[250px] rounded-xl bg-gray-100 m-1" />
          </div>
        </div>

        <div className="flex">
          <Skeleton className="h-[150px] w-[120px] rounded-xl bg-gray-100 m-1" />
          <div>
            <Skeleton className="h-[100px] w-[300px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[10px] w-[100px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[30px] w-[250px] rounded-xl bg-gray-100 m-1" />
          </div>
        </div>

        <div className="flex">
          <Skeleton className="h-[150px] w-[120px] rounded-xl bg-gray-100 m-1" />
          <div>
            <Skeleton className="h-[100px] w-[300px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[10px] w-[100px] rounded-xl bg-gray-100 m-1" />
            <Skeleton className="h-[30px] w-[250px] rounded-xl bg-gray-100 m-1" />
          </div>
        </div>
      </div>
    </div>
    )
}

export function CourseSkeleton() {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-black shadow-sm ">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold flex-1 text-center">Course Details</h1>
          <Button variant="ghost" size="icon">
            <Share2 className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-3 mt-10">
        <Skeleton className="h-[200px] w-[400px] rounded-xl bg-gray-100 " />
      </div>
      <div className="flex flex-col pl-5 space-y-3 mt-5">
        <Skeleton className="h-[30px] w-[200px] rounded-xl bg-gray-100 " />
        <Skeleton className="h-[30px] w-[150px] rounded-xl bg-gray-100 " />
      </div>
      <div className="flex flex-col pl-5 space-y-3 mt-20">
        <Skeleton className="h-[30px] w-[400px] rounded-xl bg-gray-100 " />
        <Skeleton className="h-[30px] w-[400px] rounded-xl bg-gray-100 " />
      </div>
      <div className="flex flex-col pl-5 space-y-3 mt-20">
        <Skeleton className="h-[50px] w-[400px] rounded-xl bg-gray-100 " />
      </div>
    </div>
  )
}
