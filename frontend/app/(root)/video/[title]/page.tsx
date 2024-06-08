import Header from "@/components/shared/Header";
import Video from "@/components/shared/Video";
import { videosArr } from "@/constants";

interface IParams {
  params: { title: string };
}

const VideoPage = ({ params: { title } }: IParams) => {
  const video = videosArr.find((v) => v.title === title);

  return (
    <section className="page-section">
      <Header />
      <div className="pt-[80px] flex gap-2">
        <div className="w-[65%]">
          <Video video={video!} />
        </div>
      </div>
    </section>
  );
};

export default VideoPage;
