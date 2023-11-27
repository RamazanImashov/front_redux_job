import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteResumeFile,
  editProfile,
  getOneProfile,
  uploadResumeFile,
} from "../../store/profiles/profilesActions";
import "./OneProfile.css";
import ChangePassModal from "./ChangePassModal";
import ResumeModal from "../resume/ResumeModal";
import ProfileProjects from "./ProfileProjects";


const OneProfile = () => {
  const [modal, setModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeModal, setResumeModal] = useState(false);

  const { oneProfile } = useSelector((state: RootState) => state.profiles);

  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneProfile({ user: +id! }));
  }, [dispatch]);

  const navigate = useNavigate();

  const [edit, setEdit] = useState<any>(null);

  console.log(edit);

  return (
    <div>
      {edit ? (
        <div>
          <div>
            <p>Языки:</p>
            <input
              type="text"
              value={edit?.languages}
              onChange={(e) => setEdit({ ...edit, languages: e.target.value })}
            />
          </div>
          <div>
            <p>Языки программирования:</p>
            <input
              type="text"
              value={edit?.programming_languages}
              onChange={(e) =>
                setEdit({ ...edit, programming_languages: e.target.value })
              }
            />
          </div>
          <div>
            <p>Образование:</p>
            <input
              value={edit?.education}
              onChange={(e) => setEdit({ ...edit, education: e.target.value })}
              type="text"
            />
          </div>
          <div>
            <p>Стэк:</p>
            <input
              type="text"
              value={edit?.stack}
              onChange={(e) => setEdit({ ...edit, stack: e.target.value })}
            />
          </div>
          <div>
            <p>О себе:</p>
            <input
              type="text"
              value={edit?.about}
              onChange={(e) => setEdit({ ...edit, about: e.target.value })}
            />
          </div>
          <div>
            <p>Возраст:</p>
            <input
              type="text"
              value={edit?.age}
              onChange={(e) => setEdit({ ...edit, age: e.target.value })}
            />
          </div>
          <div>
            <p>Опыт работы:</p>
            <input
              type="text"
              value={edit?.work_experience}
              onChange={(e) =>
                setEdit({ ...edit, work_experience: e.target.value })
              }
            />
          </div>
          <div>
            <p>Достижения:</p>
            <input
              type="text"
              value={edit?.achievements}
              onChange={(e) =>
                setEdit({ ...edit, achievements: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e: any) => {
                const selectedFile = e.target.files[0];
                setEdit({ ...edit!, profile_image: selectedFile });
              }}
            />
          </div>

          <div>
            <button
              onClick={() => {
                dispatch(
                  editProfile({
                    profile: edit,
                  })
                );
                setEdit(null);
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="profile">
            <div className="profile--image">
              <img src={oneProfile?.profile_image} alt="lalala" />
            </div>
            <div className="profile--content">
              <p>Языки: {oneProfile?.languages} </p>
              <p>Языки программирования: {oneProfile?.programming_languages}</p>
              <p>Образование:{oneProfile?.education}</p>
              <p>Стэк:{oneProfile?.stack} </p>
              <p>О себе:{oneProfile?.about}</p>
              <p>Возраст: {oneProfile?.age}</p>
              <p>Опыт работы:{oneProfile?.work_experience}</p>
              <p>Достижения:{oneProfile?.achievements}</p>
              <button
                onClick={() => setEdit(oneProfile)}
                style={{ color: "red" }}
              >
                Редактировать:
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div>
          {edit ? (
            <div>
              <div>
                <p>Языки:</p>
                <input type="text" />
              </div>
              <div>
                <p>Языки программирования:</p>
                <input type="text" />
              </div>
              <div>
                <p>Образование:</p>
                <input type="text" />
              </div>
              <div>
                <p>Стэк:</p>
                <input type="text" />
              </div>
              <div>
                <p>О себе:</p>
                <input type="text" />
              </div>
              <div>
                <p>О себе:</p>
                <input type="text" />
              </div>
              <div>
                <p>Возраст:</p>
                <input type="text" />
              </div>
              <div>
                <p>Достижения:</p>
                <input type="text" />
              </div>
              <div>
                <img src="" alt="" />
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Языки: {oneProfile?.languages} </p>
                <p>
                  Языки программирования: {oneProfile?.programming_languages}
                </p>
                <p>Образование:{oneProfile?.education}</p>
                <p>Стэк:{oneProfile?.stack} </p>
                <p>О себе:{oneProfile?.about}</p>
                <p>Возраст: {oneProfile?.age}</p>
                <p>Опыт работы:{oneProfile?.work_experience}</p>
                <p>Достижения:{oneProfile?.work_experience}</p>
                <img src={oneProfile?.profile_image} alt="kotak" />
              </div>
              <button style={{ color: "red" }}>Редактировать:</button>
            </div>
          )}
          <a
            onClick={() => setModal(true)}
            className="text-blue-400 underline cursor-pointer"
          >
            Change password
          </a>
          {modal && <ChangePassModal setModal={setModal} />}
          <div>
            {oneProfile?.upload_resume.length ? (
              <>
                <p>resume</p>

                {oneProfile?.upload_resume[0].upload_file.includes(".jpg") ||
                oneProfile?.upload_resume[0].upload_file.includes(".png") ||
                oneProfile?.upload_resume[0].upload_file.includes(".jpeg") ||
                oneProfile?.upload_resume[0].upload_file.includes(".svg") ? (
                  <img
                    src={`https://server.reduxjob.com${oneProfile?.upload_resume[0].upload_file}`}
                    alt="kchau"
                    width="100"
                  />
                ) : (
                  <button className="bg-gray-500 p-2">
                    <a
                      href={`https://server.reduxjob.com${oneProfile?.upload_resume[0].upload_file}`}
                      target="_blanck"
                    >
                      Open File
                    </a>
                  </button>
                )}
                <button
                  onClick={() => {
                    dispatch(
                      deleteResumeFile({
                        resumeId: oneProfile?.upload_resume[0].id,
                        id: +id!,
                      })
                    );
                  }}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <label>Upload resume</label>
                <input
                  type="file"
                  onChange={(e: any) => {
                    const selectedFile = e.target.files[0];
                    setResumeFile(selectedFile);
                  }}
                />
                {resumeFile && (
                  <button
                    className="bg-green-500 p-2"
                    onClick={() =>
                      dispatch(uploadResumeFile({ resumeFile, id: +id! }))
                    }
                  >
                    Save Resume
                  </button>
                )}
              </>
            )}
          </div>
          {oneProfile?.resume1.length ? (
            <button
              onClick={() => setResumeModal(true)}
              className="bg-yellow-500"
            >
              See Resume
            </button>
          ) : (
            <button
              className="bg-blue-400 p-2"
              onClick={() => navigate("/resume")}
            >
              Create Resume
            </button>
          )}
        </div>
        <ProfileProjects projects={oneProfile?.project!} />
      </div>
    </div>
  );
};

export default OneProfile;
