import Header from "@/components/shared/Header";
import Video from "@/components/shared/Video";
import { videosArr } from "@/constants";

interface IParams {
  params: { array: string };
}

const VideosPage = ({ params: { array } }: IParams) => {
  const videos = videosArr.filter((v) => array.includes(v.title));

  return (
    <section className="page-section">
      <Header />
      <div className="pt-[80px] flex">
        <div className="grid grid-cols-3 gap-4 pl-2 pr-2">
          {videos.map((vid) => (
            <Video video={vid} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosPage;
