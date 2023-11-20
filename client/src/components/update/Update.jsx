import { makeRequest } from "../../axios"
import { useState } from "react"
import "./update.scss"
import { useMutation, useQueryClient } from "react-query"

const Update = ({setOpenUpdate, user}) => {
  const [cover, setCover] = useState(null)
  const [profile, setProfile] = useState(null)
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: ""
  })

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value]}))
  }

  const upload = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const queryClient = useQueryClient()
  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"])
      },
    }
  )
  
  const handleClick = async (e) => {
    e.preventDefault()
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({...texts, coverPic: coverUrl, profilePic: profileUrl})
    setOpenUpdate(false)
  }
  
  return (
    <div className="update">
      
      <button className="close_button" onClick={() => setOpenUpdate(false)}>X</button>
      <div className="form">
        
        <form>
          <h1>Atualização de dados</h1>
          <label for="setCover">Foto de capa</label>
          <input type="file" id="setCover" onChange={e=>setCover(e.target.files[0])}/>
          <label for="setProfilePic">Foto de perfil</label>
          <input type="file" id="setProfilePic" onChange={e=>setProfile(e.target.files[0])}/>
          <input type="text" placeholder="Nome" name="name" onChange={handleChange}/>
          <input type="text" placeholder="Cidade" name="city" onChange={handleChange}/>
          <input type="text" placeholder="Website"name="website" onChange={handleChange}/>
          <button onClick={handleClick}>Atualizar</button>
        </form>
      </div>
    </div>
  )
}

export default Update