import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { MdPlace } from "react-icons/md";
import Footer from "./Layout/Footer";
import { baseUrl } from "../../files/file";
import { getuserdestination } from "../../services/Userapi";
import { useNavigate } from "react-router-dom";
 
const Destination = () => {
  const [destination, setDestination] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  console.log(currentpage, "current page");
  const recordpage = 3;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = destination.slice(firstIndex, lastIndex);
  console.log(records, "record count in user side...");
  const npage = Math.ceil(destination.length / recordpage);
  console.log(npage, "npage of count...");
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function changePage(id) {
    setCurrentpage(id);
  }

  function prePage() {
    if (currentpage !== firstIndex) {
      setCurrentpage(currentpage - 1);
    }
  }
  function nextPage() {
    if (currentpage !== lastIndex) {
      setCurrentpage(currentpage + 1);
    }
  }
  useEffect(() => {
    userdestination();
  }, []);
  const navigate = useNavigate();
  const handleView = async (item) => {
    try {
      navigate(`/viewdestination/${item}`, { state: { item } });
    } catch (error) {}
  };
  const userdestination = async () => {
    try {
      let { data } = await getuserdestination();
      if (data.success) {
        setDestination(data.destination);
      }
    } catch (error) {}
  };
  console.log(destination,"00000");
  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />
      <div className="flex flex-wrap">
        {records.map((item) => (
          <div className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 ">
            <figure>
              <img
                src={`${baseUrl}${item?.dest_img[0]}`}
                className="rounded-tl-[20px] mb-8"
                alt="Movie"
              />
            </figure>
            <div className="mb-4 flex flex-col">
              <div className="flex items-center mb-2">
                <div className="text-lg mr-2" />
                <div className="text-lg font-semibold">{item.dest_name}</div>
              </div>
              <div className="flex items-center">
                <MdPlace className="text-lg mr-2" />
                <div className="text-black">{item.place}</div>
              </div>
              <div className="flex items-center">
                <div className="text-lg mr-2" />
                <div className="text-black">{item.resortName}</div>
              </div>

              <button
                onClick={() => {
                  handleView(item._id);
                }}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="join flex  justify-center ">
        <button
          className="join-item btn btn-outline  btn-info"
          onClick={prePage}
        >
          Prev
        </button>
        {numbers.map((n, i) => (
          <div className={`join ${currentpage === n ? "active" : ""}`} key={i}>
            <button
              className="join-item btn btn-outline btn-info"
              onClick={() => changePage(n)}
            >
              {n}
            </button>
          </div>
        ))}
        <button
          className="join-item btn btn-outline btn-info"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Destination;
