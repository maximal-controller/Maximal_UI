import React from "react";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const TeachersCards = ({ teachers, removeTeacher }) => {
  const navigate = useNavigate();

  return teachers?.length ? (
    <div className="list_cards">
      {teachers.map((teacher, index) => (
        <Link className="card_link" to={`/teacher/detail/${teacher?._id}`}>
          <div className="card" key={index + "-client"}>
            <div className="card_head">
              <div className="card_icon">
                <FaUserTie />
              </div>
              <h3>{Object.values(teacher?.name).join(" ")}</h3>
            </div>
            <div className="card_body">
              <p className="card_text">
                Tel. raqam: <span>{teacher?.phone}</span>
              </p>
              <p className="card_text">
                Guruhlar: <span>{teacher?.groupsCount} ta</span>
              </p>
            </div>
            <div className="card_footer">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/teacher/${teacher._id}/edit`);
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeTeacher(
                    teacher?._id,
                    Object.values(teacher?.name || "").join(" ")
                  );
                }}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="empty_list">
      <h3>
        <span className="empty_icon">
          <IoWarningOutline />
        </span>
        <p>O'qituvchilar mavjud emas</p>
      </h3>
    </div>
  );
};

export default TeachersCards;
