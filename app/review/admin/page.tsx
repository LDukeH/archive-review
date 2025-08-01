"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  //state to hold tags
  const [tags, setTags] = useState([]);

  //creating a new review
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    const tags = formData.getAll("tags");

    const reviewData = {
      ...data,
      tags,
    };

    fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    target.reset();
  };

  // Fetch tags from the database
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tag");
        const tags = await response.json();
        if (response.ok) {
          setTags(tags);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="text-primary">
      <h1>Admin Page</h1>
      <p>Welcome to the admin section of the application.</p>

      <div className="pl-4 mt-8">
        {/* create new review */}
        <h2 className="text-2xl mb-4">Create New Review</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 p-4 gap-4">
          <div className="gridItem">
            <label className="label mb-2" htmlFor="title">
              Title:
            </label>
            <input className="input" id="title" name="title" required></input>
          </div>

          <div className="gridItem">
            <label className="label mb-2" htmlFor="authorName">
              Author Name:
            </label>
            <input
              className="input"
              id="authorName"
              name="authorName"
              required
            ></input>
          </div>

          <div className="gridItem">
            <label className="label mb-2 mt-4" htmlFor="coverImage">
              Cover Image URL:
            </label>
            <input
              className="input"
              required
              id="coverImage"
              name="coverImage"
            ></input>
          </div>

          <div className="gridItem">
            <label className="label mb-2 mt-4" htmlFor="ExternalLink">
              External Link:
            </label>
            <input
              className="input"
              id="ExternalLink"
              name="ExternalLink"
            ></input>
          </div>

          <div className="col-span-2 w-full flex flex-col">
            <label className="label mb-2 mt-4" htmlFor="description">
              Description:
            </label>
            <textarea
              className="input"
              id="description"
              name="description"
              required
            ></textarea>
          </div>

          <div className="col-span-2 w-full flex flex-col">
            <label className="label mb-2 mt-4" htmlFor="pros">
              Pros:
            </label>
            <textarea
              className="input"
              id="pros"
              name="pros"
              required
            ></textarea>
          </div>

          <div className="col-span-2 w-full flex flex-col">
            <label className="label mb-2 mt-4" htmlFor="cons">
              Cons:
            </label>
            <textarea
              className="input"
              id="cons"
              name="cons"
              required
            ></textarea>
          </div>

          <div className="col-span-2 w-full flex flex-col">
            <label className="label mb-2 mt-4" htmlFor="story">
              Story:
            </label>
            <textarea
              className="input"
              id="story"
              name="story"
              required
            ></textarea>
          </div>

          <div className="col-span-2 w-full flex flex-col">
            <label className="label mb-2 mt-4" htmlFor="summary">
              Summary:
            </label>
            <textarea
              className="input"
              id="summary"
              name="summary"
              required
            ></textarea>
          </div>

          <div className="gridItem">
            <label className="label mb-2 mt-4" htmlFor="rating">
              Rating (1-5):
            </label>
            <input
              className="input max-w-16 text-center"
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              defaultValue={1}
            ></input>
          </div>

          <div className="gridItem">
            <label className="label mb-2 mt-4" htmlFor="type">
              Type:
            </label>
            <select className="input" id="type" name="type" required>
              <option value="book">Book</option>
              <option value="movie">Movie</option>
            </select>
          </div>

          <div className="col-span-2">
            <div>Tags:</div>
            <div className="grid grid-cols-8 mt-2">
              {tags.map((tag: any, index) => {
                return (
                  <div key={index} className="col-span-1 flex">
                    <input
                      type="checkbox"
                      id={tag.name}
                      name="tags"
                      value={tag.name}
                      className="mr-2 peer hidden"
                    />
                    <label
                      htmlFor={tag.name}
                      className="w-fit  inline-block peer-checked:text-accent peer-checked:font-bold cursor-pointer hover:brightness-120 transition-all duration-300"
                    >
                      {tag.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="col-span-2 bg-gray-700 font-bold mt-2 px-2 py-1 rounded-xl cursor-pointer hover:brightness-90 transition-all duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
