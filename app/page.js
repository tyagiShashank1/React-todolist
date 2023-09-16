"use client";
import React from "react";
import { useState } from "react";

const page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    console.log(mainTask);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => { 
    let copyTask = [...mainTask]; // React relies on the concept of immutability to detect changes in state. When you use arr1 = arr2,    you are mutating the original array, and React may not detect that a change has occurred, leading to unexpected behavior and potential issues with rendering. for that avoid copyTask = mainTask
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };
  let renderTask = <h2>No Task Available</h2>;

  //if mainTask is not empty then only go inside below map fucntion
  if (mainTask.length != 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <div key={i} className="flex justify-between w-2/3 mb-8">
          <span className="text-lg font-bold">{i + 1}.</span>
          <h5 className="text-2xl font-semibold">{t.title}</h5>
          <h6 className="text-lg font-medium">{t.desc}</h6>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="bg-red-400 text-white px-4 py-2 rounded font-bold"
          >
            Delete
          </button>
        </div>
      );
    });
  }

  //two way binding : user ko bhi bta rhe hai kya ho rha hai aur react ko bhi (here with help of useState variable)
  return (
    <>
      <h1 className="bg-black text-white p-5 text-2xl text-center">
        Shashank's Todo List
      </h1>

      <form onSubmit={sumbitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter title here"
          value={title} //title variable me jo value hogi vo isme dikhegi
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter description here"
          value={desc} //desc variable me jo value hogi vo isme dikhegi
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded">
          Add Task
        </button>
      </form>

      <hr />

      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
