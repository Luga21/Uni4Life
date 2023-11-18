import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import { useContext } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query"
import { AuthContext } from "../../context/authContext";


const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const {isLoading, error, data} = useQuery(["likes", post.id], () => 
  makeRequest.get("/likes?postId="+post.id).then((res) => {
console.log(data.post.id)
    return res.data;
  })
  )
  console.log(data)

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data.includes(currentUser.id) ? (<FavoriteOutlinedIcon style={{color:"red"}}/>) : (<FavoriteBorderOutlinedIcon />)}
            {data.length} Curtidas
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comentários
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Compartilhar
          </div>
        </div>
        {commentOpen && <Comments postId={post.id}/>}
      </div>
    </div>
  );
};

export default Post;
