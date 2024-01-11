"use client";
import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [id, setId] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleSearch = () => {
    if (/^\d{7}$/.test(id)) {
      getUserData(id);
      getStaticData();
    } else {
      alert("Please input validate ID, 7 digit");
    }
  };

  const getUserData = async (id: string) => {
    if (id) {
      const res = await axios.get(`/api/fpl/${id}`);
      console.log("🚀 ~ file: page.tsx:22 ~ getUserData ~ res:", res);
    }
  };

  const getStaticData = async () => {
    const res = await axios.get("/api/fpl/staticData");
    console.log("🚀 ~ getStaticData ~ res:", res);
  };

  return (
    <div className="flex justify-center flex-col items-center gap-2">
      <p className="text-xl font-bold">Please input your game id:</p>
      <input
        className="border-solid border border-slate-300 rounded w-40 h-10 px-2"
        onChange={handleChange}
      />
      <button
        className="border-solid border border-slate-300 rounded p-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
