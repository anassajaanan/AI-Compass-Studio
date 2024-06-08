import {
  Home,
  Play,
  Radio,
  Settings,
  BookText,
  CircleDollarSign,
} from "lucide-react";
import { MdOpenInNewOff } from "react-icons/md";
import { SiBlockchaindotcom } from "react-icons/si";
import { SiKakaotalk } from "react-icons/si";
import { FaGooglePlay } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { FaPodcast } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";

const iconsSize = 40;
const iconsColor = "white";

export const urls = {
  search: "http://127.0.0.1:8000/api/ai_search",
  summary: "http://127.0.0.1:8000/api/get_summary",
  brainStorm: "http://127.0.0.1:8000/api/brainstorm",
  contentGeneration: "http://127.0.0.1:8000/api/write",
  editing: "http://127.0.0.1:8000/api/editing",
  reviews: "http://127.0.0.1:8000/api/review",
  rachel: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
};

export const videosArr = [
  {
    title: "vid1",
    src: "/assets/videos/myco1.mp4",
  },
  {
    title: "vid2",
    src: "/assets/videos/myco2.mp4",
  },
  {
    title: "vid3",
    src: "/assets/videos/myco3.mp4",
  },
  {
    title: "vid4",
    src: "/assets/videos/myco4.mp4",
  },
  {
    title: "video1",
    src: "/assets/videos/video1.mp4",
    vidName:
      "The Blockchain Life, Episode 6: The Alternate Economy in Nigeria - Trailer",
    path: "/assets/files/video1.vtt",
  },
  {
    title: "video2",
    src: "/assets/videos/video2.mp4",
    vidName: "Episode 4: The Ripple vs. SEC Saga - Trailer | myco",
    path: "/assets/files/video2.vtt",
  },
  {
    title: "video3",
    src: "/assets/videos/video3.mp4",
    vidName: "COPA90 | Trailer",
    path: "/assets/files/video3.vtt",
  },
  {
    title: "video4",
    src: "/assets/videos/video4.mp4",
    vidName: "Imtiaz Legends League",
    path: "/assets/files/video4.vtt",
  },
  {
    title: "video5",
    src: "/assets/videos/video5.mp4",
    vidName: "Hamza Khan | Sponsorship signing ceremony",
    path: "/assets/files/video5.vtt",
  },
  {
    title: "video6",
    src: "/assets/videos/video6.mp4",
    vidName: "Watch It. Earn It. Ramadan It! - Episode 11",
    path: "/assets/files/video6.vtt",
  },
  {
    title: "video7",
    src: "/assets/videos/video7.mp4",
    vidName: "Ocean Deep | Trailer - streaming now on myco",
    path: "/assets/files/video7.vtt",
  },
  {
    title: "video8",
    src: "/assets/videos/video8.mp4",
    vidName: "Behind The Scenes - El Salvador vs. The World Bank | myco",
    path: "/assets/files/video8.vtt",
  },
  {
    title: "video9",
    src: "/assets/videos/video9.mp4",
    vidName:
      "Supercar Blondie | Explaining the concept behind #ProjectBlackNFT",
    path: "/assets/files/video9.vtt",
  },
];

export const pages = [
  {
    title: "Home",
    icon: <Home size={iconsSize} color={iconsColor} />,
    route: "/",
  },
  {
    title: "MyPlay",
    icon: <Play size={iconsSize} color={iconsColor} />,
    route: "/my-play",
  },
  {
    title: "My Live",
    icon: <Radio size={iconsSize} color={iconsColor} />,
    route: "/my-live",
  },
  {
    title: "My Colab",
    icon: <Settings size={iconsSize} color={iconsColor} />,
    route: "/my-colab",
  },
  {
    title: "Blogs",
    icon: <BookText size={iconsSize} color={iconsColor} />,
    route: "/my-blogs",
  },
  {
    title: "How to Earn",
    icon: <CircleDollarSign size={iconsSize} color={iconsColor} />,
    route: "/my-earn",
  },
  {
    title: "My Content",
    icon: <IoIosAddCircleOutline size={iconsSize} color={iconsColor} />,
    route: "/my-content",
  },
];

export const sectionsArr = [
  {
    title: "New Releases",
    icon: <MdOpenInNewOff color="red" size={iconsSize} />,
    videos: [
      {
        title: "vid1",
        src: "/assets/videos/myco1.mp4",
      },
      {
        title: "video4",
        src: "/assets/videos/video4.mp4",
      },
      {
        title: "video5",
        src: "/assets/videos/video5.mp4",
      },
      {
        title: "video3",
        src: "/assets/videos/video3.mp4",
      },
    ],
  },
  {
    title: "The Blockchain Life",
    icon: <SiBlockchaindotcom color="lightGreen" size={iconsSize} />,
    videos: [
      {
        title: "video6",
        src: "/assets/videos/video6.mp4",
      },
      {
        title: "video3",
        src: "/assets/videos/video3.mp4",
      },
    ],
  },
  {
    title: "They Talk When You Sleep",
    icon: <SiKakaotalk color="blue" size={iconsSize} />,
    videos: [
      {
        title: "video4",
        src: "/assets/videos/video4.mp4",
      },
      {
        title: "video5",
        src: "/assets/videos/video5.mp4",
      },
      {
        title: "video3",
        src: "/assets/videos/video3.mp4",
      },
    ],
  },
  {
    title: "Trending on Myplay",
    icon: <FaGooglePlay color="orange" size={iconsSize} />,
    videos: [
      {
        title: "video3",
        src: "/assets/videos/video3.mp4",
      },
      {
        title: "vid1",
        src: "/assets/videos/myco1.mp4",
      },
    ],
  },
  {
    title: "Featured Videos",
    icon: <BiSolidVideos color="purple" size={iconsSize} />,
    videos: [
      {
        title: "vid1",
        src: "/assets/videos/myco1.mp4",
      },
      {
        title: "video5",
        src: "/assets/videos/video5.mp4",
      },
    ],
  },
  {
    title: "MyPodcast",
    icon: <FaPodcast color="lightBlue" size={iconsSize} />,
    videos: [
      {
        title: "video3",
        src: "/assets/videos/video3.mp4",
      },
      {
        title: "video5",
        src: "/assets/videos/video5.mp4",
      },
    ],
  },
  {
    title: "Featured Profiles",
    icon: <RiProfileFill color="lightSalmon" size={iconsSize} />,

    videos: [
      {
        title: "vid1",
        src: "/assets/videos/myco1.mp4",
      },
      {
        title: "video4",
        src: "/assets/videos/video4.mp4",
      },
      {
        title: "video5",
        src: "/assets/videos/video5.mp4",
      },
      {
        title: "video3",
        src: "/assets/videos/video3.mp4",
      },
    ],
  },
];
