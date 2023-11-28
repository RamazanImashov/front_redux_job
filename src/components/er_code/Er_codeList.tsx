import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { getEr_codePosts } from "../../store/er_code/er_codeActions";
import { IEr_codePost } from "../../store/er_code/er_codeSlice";

import LazyLoading from "../loading/LazyLoading";

const Er_codeList = () => {
  const { er_codePosts, loading } = useSelector(
    (state: RootState) => state.er_code
  );
  const { currentUser } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEr_codePosts());
  }, []);

  console.log(currentUser);

  return (
    <>
      {loading ? (
        <LazyLoading />
      ) : (
        <>
          <div>
            {currentUser?.type_user === "Human" && (
              <button
                className=" uppercase border bg-gray-700 text-white rounded w-48 h-9 hover:bg-transparent hover:text-black"
                onClick={() => navigate("/er_code-add")}
              >
                Add Post of error
              </button>
            )}
          </div>
          <div className="mb-4 flex flex-col w-1/3">
            {er_codePosts.length &&
              er_codePosts.map((er_CodePost: IEr_codePost) => (
                <span
                  className="border bg-gray-700 text-white p-1 cursor-pointer"
                  onClick={() => navigate(`/er_code/${er_CodePost.id}`)}
                  key={er_CodePost.id}
                >
                  {er_CodePost.name}
                  {er_CodePost.description}
                </span>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Er_codeList;
