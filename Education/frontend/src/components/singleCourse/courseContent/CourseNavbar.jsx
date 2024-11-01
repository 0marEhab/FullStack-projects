import { Button } from "@/components/ui/button";
import React from "react";

export default function CourseNavbar() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center ">
      <Button
        variant={"outline"}
        className={"rounded-l-lg rounded-b-none  p-6 rounded-r-none w-full "}
      >
        Overview
      </Button>
      <Button variant={"outline"} className="rounded-none p-6 w-full">
        Curriculum
      </Button>
      <Button variant={"outline"} className="rounded-none p-6 w-full">
        Instructor
      </Button>
      <Button variant={"outline"} className="rounded-none p-6 w-full">
        FAQs
      </Button>
      <Button
        variant={"outline"}
        className={"rounded-r-lg rounded-b-none  rounded-l-none p-6 w-full"}
      >
        Reviews
      </Button>
    </div>
  );
}
