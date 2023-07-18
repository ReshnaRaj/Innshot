import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbars";
import Headers from "./layout/Headers";
import { getuniqueresort } from "../../services/Adminapi";
import { useParams } from "react-router-dom";
// import { baseUrl } from "../../files/file";
import {MdFileDownload} from 'react-icons/md'

const ViewResort = () => {
  const [resortdetails, setResortdetails] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    getresortdetails();
  }, []);
  const getresortdetails = async () => {
    try {
      // console.log(id,"id view page...")
      let { data } = await getuniqueresort(id);
      console.log(data, "unique data of each resort,,,");
      if (data.success) {
        // console.log(data.success,"resort data getting succes....")
        console.log(data.resortdata, "yyyyyy");
        setResortdetails(data.resortdata);
      }
    } catch (error) {}
  };

  const images = Array.from({ length: resortdetails?.image?.length }).map((_, index) => ({
    id: index + 1,
    src: `${resortdetails?.image && resortdetails?.image[index]}`,
  }));
  // console.log(resortdetails,"repppp")
  
  return (
    <>
      <div className="flex">
        <Navbars />
        <div className="flex-1">
          <Headers name={"View Resort"} />
          <div className="card lg:card-side bg-slate-500 shadow-xl rounded-none flex-row">
            <figure>
              {resortdetails?.image && resortdetails.image[0] ? (
                <img
                  src={`${resortdetails.image[0]}`}
                  alt="resort image"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                <span>No image available</span>
              )}
            </figure>
            <div className="card-body h-60">
              <h2 className="card-title">{resortdetails?.resortname}</h2>
              <p>{resortdetails?.address}</p>
              <div className="card-actions justify-end">
                {/* You can open the modal using ID.showModal() method */}
                <label className="btn" htmlFor="view_image">
                  View Images
                </label>
                <input
                  type="checkbox"
                  id="view_image"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="carousel">
                    {images?.map((image) => (
                      <div
                        id={`slide${image?.id}`}
                        key={image?.id}
                        className="carousel-item relative w-full"
                      >
                        <img
                          src={image?.src}
                          className="w-40 mx-auto"
                          alt="IMAGE"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                          <a
                            href={`#slide${
                              image?.id === 1 ? images?.length : image?.id - 1
                            }`}
                            className="btn btn-circle btn-ghost"
                          >
                            ❮
                          </a>
                          <a
                            href={`#slide${
                              image?.id === images?.length ? 1 : image?.id + 1
                            }`}
                            className="btn btn-circle btn-ghost"
                          >
                            ❯
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <label className="modal-backdrop" htmlFor="view_image">
                    close
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="card lg:card-side bg-slate-500 shadow-xl rounded-none h-96">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Overview of Resort
            </h3>

            <div className="card-body">
              <h2>Address & place</h2>
              <p>{resortdetails.address}</p>
              <p>{resortdetails.place}</p>
              <h2>Description</h2>
              <p>{resortdetails.description}</p>
              <h2>Certificate uploaded</h2>
              <a href={`${resortdetails?.document}`} download><MdFileDownload/></a>
              {resortdetails?.document ? (
                <>
                <embed
                  src={`${resortdetails?.document}`}
                  type="application/pdf"
                  width="50%"
                  height="100px"
                />
                
                </>
              ) : (
                <p>No document available</p>
              )}
              {/* certicate image upload  */}
            </div>
            <div className="card w-96 bg-blue-500 shadow-xl rounded-none">
              {/* <figure className="px-10 pt-10">
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="profile of resortowner"
                  className="rounded-xl"
                />
              </figure> */}
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Name:{resortdetails?.resortowner?.name}
                </h2>
                <h2 className="text-xl font-semibold">
                  contact:{resortdetails?.resortowner?.phone}
                </h2>
                <h2 className="text-xl font-semibold mb-20">
                  Email:{resortdetails?.resortowner?.email}
                </h2>

                {/* <div className="card-actions justify-end">
      <button className="btn btn-success">Approve</button>
      <button className="btn btn-error">Reject</button>
    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewResort;
