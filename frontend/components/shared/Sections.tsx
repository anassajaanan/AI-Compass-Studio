"use client";

import { sectionsArr } from "@/constants";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import Image from "next/image";

const Sections = () => {
  const router = useRouter();

  return (
    <section className="z-20 w-full fixed bottom-0 flex justify-center items-center pr-14 pl-14">
      <div className="flex w-full max-w-screen justify-around">
        {sectionsArr.map((container, idx) => {
          const { title, icon, videos } = container;
          return (
            <div key={`${title}-${idx}`}>
              <Drawer>
                <DrawerTrigger className="flex flex-col justify-between items-center gap-4 bg-white p-4 rounded-t-[7px] flex-1 w-[200px] h-[150px]">
                  <div className="h-[50%] flex items-center justify-center">
                    {icon}
                  </div>
                  <p className="h-[50%] text-[16px] mb-2 text-black video-title flex justify-center items-center">
                    {title}
                  </p>
                </DrawerTrigger>
                <DrawerContent className="pr-4 pl-4 h-[70vh] overflow-hidden">
                  <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                  </DrawerHeader>
                  <DrawerFooter className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 ">
                    {videos.map((video) => (
                      <CardContainer
                        key={video.title}
                        className="w-full cursor-pointer"
                        handleClick={() => router.push(`/video/${video.title}`)}
                      >
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-[200px] rounded-xl p-6 border">
                          <CardItem
                            translateZ="100"
                            className="w-full h-full mt-4 relative flex items-center justify-center group"
                          >
                            <Play
                              size={80}
                              className="absolute text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <video className="w-full h-full">
                              <source src={video.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </CardItem>
                          <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white mt-2"
                          >
                            {video.title}
                          </CardItem>
                          <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 pb-2 mb-2"
                          >
                            Hover over this card to unleash the power of CSS
                            perspective
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    ))}
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Sections;
