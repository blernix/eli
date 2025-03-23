"use client";
import { useEffect, useState } from "react";

export default function Notification({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!data) return;

    const now = new Date();
    const start = data.date_start ? new Date(data.date_start) : null;
    const end = data.start_end ? new Date(data.start_end) : null;

    if (
      (!start || now >= start) &&
      (!end || now <= end)
    ) {
      setVisible(true);
    }
  }, [data]);

  if (!data || !visible) return null;

  const content = (
    <div
      className="prose-description"
      dangerouslySetInnerHTML={{ __html: data.message }}
    />
  );

  switch (data.type) {
    case "popup":
      return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full text-center">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>
            {content}
          </div>
        </div>
      );

    case "bandeau":
      return (
        <div className="fixed bottom-0 w-full bg-gray-900 text-white text-center py-3 z-40 shadow-lg">
          {content}
        </div>
      );

    case "defilement":
      return (
        <div className="fixed top-0 w-full bg-blue-700 text-white overflow-hidden z-40">
          <div className="animate-marquee whitespace-nowrap py-2 px-4">
            {content}
          </div>
        </div>
      );

    default:
      return null;
  }
}