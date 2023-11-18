import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from 'react-query'
import { makeRequest } from '../../axios'

const Share = () => {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null)
  const [desc, setDesc] = useState("")

  const { currentUser } = useContext(AuthContext)
  
  const queryClient = useQueryClient()

  const mutation = useMutation((newPost)=>{
    return makeRequest.post("/posts", newPost)
  }, 
  {
    onSucces: () => {
      queryClient.invalidateQueries(['posts'])
    },
  })

  const handleClick = e =>{
    e.preventDefault()
    mutation.mutate({desc})
  } 
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`O que você está pensando ${currentUser.name}?`} onChange={(e) => setDesc(e.target.value)}/>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Adicionar Imagem</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Adicional local</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Marcar Amigos</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Compartilhar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;