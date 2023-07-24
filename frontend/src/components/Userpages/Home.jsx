import React, { useState, useEffect } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { SiGooglechat } from "react-icons/si";
import { MdPlace } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { baseUrl } from "../../files/file";
import {
  getuserresort,
  getuseradventure,
  getuserdestination,
} from "../../services/Userapi";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const users = useSelector((state) => state.user);
  const [resort, setuserresort] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [destination, setDestination] = useState([]);
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    userdestination();
  }, []);
  useEffect(() => {
    useradventure();
  }, []);
  const useradventure = async () => {
    try {
      let { data } = await getuseradventure();
      if (data.success) {
        setAdventure(data.adventure.slice(0, 3));
      }
    } catch (error) {}
  };
  const userresort = async () => {
    try {
      let { data } = await getuserresort();
      // console.log(data, "data from user side...");
      if (data.success) {
        setuserresort(data.resortt.slice(0, 3));
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };
  const userdestination = async () => {
    try {
      let { data } = await getuserdestination();
      if (data.success) {
        setDestination(data.destination.slice(0, 3));
      }
    } catch (error) {}
  };
  const handleView = async (item) => {
    try {
      navigate(`/viewdata/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async (item) => {
    try {
      navigate(`/viewadventure/${item}`, { state: { item } });
    } catch (error) {}
  };
  const handleSee = async (item) => {
    try {
      navigate(`/viewdestination/${item}`, { state: { item } });
    } catch (error) {}
  };
  useEffect(() => {
    userresort();
  }, []);

  const images = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677179/1_cbhjim.jpg",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677191/2_nfusff.jpg",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677178/3_pxjgsg.jpg",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677184/4_izdg7c.jpg",
    },
  ];
  console.log(users, "updated");
  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />

      <div className="carousel">
        {images.map((img) => (
          <div
            id={`slide${img.id}`}
            key={img.id}
            className="carousel-item relative w-full"
          >
            <img
              src={img.src}
              className="w-full max-h-96 object-cover"
              alt="IMAGE"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center mb-16">
              <div
                className="text-slate-100 text-4xl font-thin pt-0"
                style={{ fontFamily: "monospace", fontStyle: "italic" }}
              >
                Explore With Innshot
              </div>
              {/* <p className="text-slate-100 text-lg font-mono">
                Find your next stay Search low prices on hotels, homes and much
                more
              </p> */}
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${img.id === 1 ? images.length : img.id - 1}`}
                className="btn btn-circle btn-ghost"
              >
                ❮
              </a>
              <a
                href={`#slide${img.id === images.length ? 1 : img.id + 1}`}
                className="btn btn-circle btn-ghost"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="stats stats-vertical mt-4 border border-sky-400 flex justify-between lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-value">5+</div>
          <div className="text-2xl font-sans">Year experience</div>
        </div>

        <div className="stat">
          <div className="stat-value">50+</div>
          <div className="text-2xl font-sans">Resorts</div>
        </div>

        <div className="stat">
          <div className="stat-value">2+</div>
          <div className="text-2xl font-sans">Countries</div>
        </div>
      </div>
      <div className=" my-10 card border border-stone-400 rounded-2xl shadow-2xl bg-opacity-80 bg-sky-100 mx-2">
        <div className="card-body">
          <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
            Our Featured Resorts
          </h1>
          <div className="flex flex-wrap">
            {resort.map((item) => (
              <div
                className="bg-white shadow-2xl p-4  w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 border-sky-300 "
                key={item.resortname}
              >
                <figure>
                  <img
                    src={`${item.image[0]}`}
                    alt="resort image"
                    className="mb-1"
                  />
                </figure>
                <div className="flex flex-col">
                  <div className="flex items-center ">
                    <div className="text-lg font-semibold">
                      {item.resortname} 
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MdPlace className="text-lg mr-2" />
                    <div className="text-black">{item.place}</div>
                  </div>
                  <div className="flex items-center">
                    <FaRupeeSign className="text-sm" />
                    <div className="text-black">{item.price} per room</div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleView(item._id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-body">
          <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
            Enjoy your favourite Activities with Innshot
          </h1>
          <div className="flex flex-wrap">
            {adventure.map((item) => (
              <div className="bg-white shadow-2xl p-4  w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 border-sky-300">
                <figure>
                  <img
                    src={`${baseUrl}${item?.image[0]}`}
                    className="mb-1"
                    alt="Movie"
                  />
                </figure>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="text-lg font-semibold">{item.activity}</div>
                  </div>
                  <div className="flex items-center">
                    <MdPlace className="text-lg mr-2" />
                    <div className="text-lg font-semibold">{item.place}</div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log("advrihdb working...");
                      handleClick(item._id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-body">
          <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
            Keep calm and travel on....
          </h1>
          <div className="flex flex-wrap">
            {destination.map((item) => (
              <div className="bg-white shadow-2xl p-4  w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 border-sky-300">
                <figure>
                  <img
                    src={`${baseUrl}${item?.dest_img[0]}`}
                    className="mb-1"
                    alt="Movie"
                  />
                </figure>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="text-lg mr-2" />
                    <div className="text-lg font-semibold">
                      {item.dest_name}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MdPlace className="text-lg mr-2" />
                    <div className="text-black">{item.place}</div>
                  </div>
                  {/* <div className="flex items-center">
                    <div className="text-lg mr-2" />
                    <div className="text-black">{item.resortName}</div>
                  </div> */}

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleSee(item._id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
        Visit our customers gallery
      </h1>
      <div className="carousel carousel-center rounded-box">
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1687673666/v6oroggh6vs5dtgha7u9.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1687437266/dhepcxq9jp5uvau3g266.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1688814516/fjntav4opxwjyxbb0kaw.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1688814515/hjrhzteniy1cvtenicyk.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1688814516/prnwhzc0yken9fz2ginb.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1688814516/fmzdujolqroarwtntfw3.webp"
            alt="Pizza"
          />
        </div>
      </div>
      {/* <SiGooglechat className="fixed bottom-4 right-4 z-50 text-4xl text-primary" /> */}
      <Footer />
    </div>
  );
};

export default Home;
