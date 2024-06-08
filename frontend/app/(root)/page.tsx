import Header from "@/components/shared/Header";
import BackGrounds from "@/components/shared/BackGrounds";
import AISearch from "@/components/shared/AISearch";
import Sections from "@/components/shared/Sections";

const Home = async () => {
  return (
    <section>
      <Header />
      <BackGrounds />
      <AISearch />
      <Sections />
    </section>
  );
};

export default Home;
