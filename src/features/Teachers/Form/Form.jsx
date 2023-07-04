import React, { useEffect, useState } from "react";
import "./Form.scss";
import { useNavigate, useParams } from "react-router-dom";
import { editTeacherApi, getTeacherApi, createTeacherApi } from "../api";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [groups, setGroups] = useState("");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");
  const { teacherId } = useParams();

  useEffect(() => {
    if (teacherId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getTeacherApi(teacherId);

          setName(data?.name || "");
          setGroups(data?.groups || "");
          setCourse(data?.info || "");
          setPhone(data?.phone || "");
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (teacherId) {
        await editTeacherApi({ name, groups, course, info }, teacherId);
      } else {
        await createTeacherApi({ name, groups, course, info });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    clear();
    navigate("/teachers");
  };

  const clear = () => {
    setName("");
    setPhone("");
    setInfo("");
  };

  return (
    <div className="teacher_form">
      <div className="form_head">
        <h1>{teacherId ? "O'qituvchi o`zgartirish" : "O'qituvchi qo`shish"}</h1>
      </div>
      <div className="form_box">
        <form onSubmit={submitHandler}>
          <div className="input_form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ism"
              disabled={loading}
            />
          </div>

          <div className="input_form">
            <input
              type="text"
              value={groups}
              onChange={(e) => setGroups(e.target.value)}
              placeholder="Guruhlar"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Kurs"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tel. raqam"
              disabled={loading}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={teacherId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;