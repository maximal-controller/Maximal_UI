import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const StudentsList = ({ students, removeStudent }) => {
  const navigate = useNavigate();

  return students?.length ? (
    <table className="list_table">
      <thead>
        <tr>
          <th>Ism</th>
          <th>Tel. raqam</th>
          <th>Guruh</th>
          <th>O'qituvchi</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>
              <Link
                className="table_link"
                to={`/student/detail/${student._id}`}
              >
                {Object.values(student?.name).join(" ")}
              </Link>
            </td>
            <td>{student?.phone}</td>
            <td>{student?.group}</td>
            <td>{Object.values(student?.teacher || "").join(" ")}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={() => navigate(`/student/${student?._id}/edit`)}
                    >
                      O'zgartitrish
                    </li>
                    <li
                      onClick={() =>
                        removeStudent(
                          student?._id,
                          Object.values(student?.name || "").join(" ")
                        )
                      }
                    >
                      O'chirish
                    </li>
                  </ul>
                </div>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="empty_list">
      <h3>
        <span className="empty_icon">
          <IoWarningOutline />
        </span>
        <p>O'quvchilar mavjud emas</p>
      </h3>
    </div>
  );
};

export default StudentsList;
