import CardUser from "../components/card/cardUser";
import MainLayout from "../components/layout/mainLayout";

function Home() {
  return (
    <>
      <div className="background-box flex justify-center items-center	opacity-75 py-10 md:py-0">
        <div className="box-register relative w-4/5 md:w-3/5  bg-transparent	rounded-lg border border-white md:h-4/6 h-5/6	 drop-shadow-md">
          <div className=" p-16	">
            <h1 className="mb-5">List user</h1>
            <CardUser />
          </div>
        </div>
      </div>
    </>
  );
}
Home.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
