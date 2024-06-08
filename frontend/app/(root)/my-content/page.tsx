"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/Header";
import AIBrainStorming from "@/components/shared/AIBrainStorming";
import AIContentGeneration from "@/components/shared/AIContentGeneration";
import AIEditing from "@/components/shared/AIEditing";
import AIReviews from "@/components/shared/AIReviews";

const MyContent = () => {
  return (
    <section className="page-section text-white overflow-hidden">
      <Header />
      <div className="pt-[80px] p-4 flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/assets/images/42.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-bold">AiChain Heros</p>
      </div>
      <div className="p-4">
        <Tabs defaultValue="brainstorming" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="brainstorming"
              className="data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              AI Brain Storming
            </TabsTrigger>
            <TabsTrigger
              value="contentGeneration"
              className="data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              AI Content Generation
            </TabsTrigger>
            <TabsTrigger
              value="editing"
              className="data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              AI Editing
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              AI Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="brainstorming" className="h-[470px]">
            <AIBrainStorming />
          </TabsContent>
          <TabsContent value="contentGeneration" className="h-[470px]">
            <AIContentGeneration />
          </TabsContent>
          <TabsContent value="editing" className="h-[470px]">
            <AIEditing />
          </TabsContent>
          <TabsContent value="reviews" className="h-[470px]">
            <AIReviews />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MyContent;
