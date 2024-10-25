import React from "react";
import CoursesCard from "./CoursesCard";
import { Button } from "@/components/ui/button";

export default function Courses() {
  return (
    <>
      <div className="flex md:ml-[300px] md:w-[1300px] mt-10 md:text-start items-center text-center justify-between gap-3 ">
        <div className="text-start mx-5 md:mx-0">
          <h2 className="text-2xl  md:text-3xl  font-bold ">
            Featured courses
          </h2>
          <p>Explore our Popular Courses</p>
        </div>
        <Button
          variant="outline"
          className=" rounded-full md:mr-0 mr-4  md:px-10"
        >
          All Courses
        </Button>
      </div>
      <div className="flex mx-auto md:w-[1400px] justify-center  items-center gap-6 mt-10 flex-wrap">
        <CoursesCard
          instructor={"Omar Ehab"}
          title={"Create an LMS Website with LearnPress"}
          weeks={"3"}
          students={54}
          price={29.9}
          type={"Photography"}
          img="/Group0.png"
        />
        <CoursesCard
          instructor={"Omar Ehab"}
          title={"Create an LMS Website with LearnPress"}
          weeks={"3"}
          students={54}
          price={29.9}
          type={"Photography"}
          img="/Group0.png"
        />
        <CoursesCard
          instructor={"Omar Ehab"}
          title={"Create an LMS Website with LearnPress"}
          weeks={"3"}
          students={54}
          price={29.9}
          type={"Photography"}
          img="/Group0.png"
        />
        <CoursesCard
          instructor={"Omar Ehab"}
          title={"Create an LMS Website with LearnPress"}
          weeks={"3"}
          students={54}
          price={29.9}
          type={"Photography"}
          img="/Group0.png"
        />
        <CoursesCard
          instructor={"Omar Ehab"}
          title={"Create an LMS Website with LearnPress"}
          weeks={"3"}
          students={54}
          price={29.9}
          type={"Photography"}
          img="/Group0.png"
        />
        <CoursesCard
          instructor={"Omar Ehab"}
          title={"Create an LMS Website with LearnPress"}
          weeks={"3"}
          students={54}
          price={29.9}
          type={"Photography"}
          img="/Group0.png"
        />
      </div>
    </>
  );
}
