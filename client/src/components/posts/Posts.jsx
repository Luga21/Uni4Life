import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from 'react-query';


const Posts = () => {
  // eslint-disable-next-line no-unused-vars
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error  
        ? "Alguma coisa não ocorreu como esperado"
        : isLoading 
        ? "carregando" 
        : data // Verifica se data existe antes de chamar map
          ? data.map((post) => <Post post={post} key={post.id} />)
          : "Nenhum dado encontrado" }
    </div>
  );
};

export default Posts;
