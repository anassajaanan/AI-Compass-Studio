import Header from "@/components/shared/Header";

const Blogs = () => {
  return (
    <section className="page-section">
      <Header />
      <div className="pt-[80px] flex gap-2">
        <div className="w-full">
          <h1 className="text-white text-[40px] font-bold text-xl text-center">
            Blogs
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
