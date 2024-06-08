"use client";

import { usePathname } from "next/navigation";
import { pages } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const mainSecStyles =
    "z-20 absolute top-0 w-full flex justify-between bg-transparent pl-5 pr-5 pt-2";
  const subSecStyles =
    "z-20 absolute top-0 w-full flex justify-between bg-[#2e3846] pl-5 pr-5 pt-2";
  const mainPagesStyles = "text-[#0d1929] flex gap-9 p-2 w-full";
  const subPagesStyles = "text-white flex gap-9 p-2 w-full ";

  return (
    <section className={pathname === "/" ? mainSecStyles : subSecStyles}>
      <div className={pathname === "/" ? mainPagesStyles : subPagesStyles}>
        {pages.map((page) => (
          <Link
            key={page.title}
            href={page.route}
            className={`cursor-pointer hover:border-b-4 hover:border-green-400 ${
              pathname === "/" ? "bg-white" : "bg-[#0d1929]"
            }  rounded-[7px] flex justify-center items-center pr-2 pl-2`}
          >
            {page.title}
          </Link>
        ))}
      </div>
      <Image
        src="/assets/images/logo.png"
        alt="myco logo"
        height={70}
        width={105}
      />
    </section>
  );
};

export default Header;
