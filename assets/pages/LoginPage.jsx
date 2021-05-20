import React, {useState} from 'react';
import authAPI from '../services/authAPI'

const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name 

        // ... copie de l'objet credentials et la vifgule permet de dire avec modification (ajout ou remplacement)
        // si on laisse simplement le name, il va venir écrire une entré name donc on va utiliser les crochet pour prendre en considération la valeur de la const name (ex: username)
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log(credentials)
        try{
            await authAPI.authenticate(credentials)
            setError("")
        }catch(error){
            setError("Aucun compte ne possède cette adresse e-mail ou les informations ne correspond pas")
        }
    }

    return ( 
        <>
            <div className="row">
                <div className="col-4 offset-4">
                    <form onSubmit={handleSubmit}>
                        <h1>Connexion</h1>
                        <div className="form-group">
                            <label htmlFor="username">Adresse E-mail</label>
                            <input 
                                type="email"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Adresse E-mail de connexion"
                                id="username"
                                name="username"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input 
                                type="password" 
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Mot de passe"
                                id="password"
                                name="password"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">Connexion</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
     );
}
 
export default LoginPage;