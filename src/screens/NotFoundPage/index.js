import React, { useEffect } from "react";

import "./style.scss";

function NotFoundPage() {
  // const randIndex = Math.floor(Math.random() * 3);

  useEffect(() => {
    const text1 = document.getElementById("text_1");
    let shadow = "";

    for (let i = 0; i < 30; i++) {
      shadow += (shadow ? "," : "") + -i * 1 + "px " + i * 1 + "px 0 #d9d9d9";
    }
    text1.style.textShadow = shadow;
  }, []);

  return (
    <div className="not_found_page">
      <div id="text_1" data-text="404 Not Found">
        404 Not Found
      </div>
    </div>
  );
}

export default NotFoundPage;
