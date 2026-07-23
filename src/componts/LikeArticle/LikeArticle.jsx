import React, { useState, useEffect } from "react";
import { getarticleL} from "../../services/api";
import { useParams } from "react-router-dom";

const LikeArticle = () => {
  const id  = useParams(); // اینجا از Object destructuring استفاده کنید
  console.log(id);
  
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      getarticleL(id).then((res) => {
        setArticle(res);
      })
    }
  }, [id]);

  if (!article) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="p-30">
      <h1>{article.title}</h1>
      <p>{article.body}</p> {/* سایر محتوای مقاله */}
    </div>
  );
};

export default LikeArticle;
