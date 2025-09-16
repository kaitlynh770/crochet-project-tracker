import { useState } from "react";
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from './Login.module.scss'

function Login({setUser}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [seeLogin, setSeeLogin] = useState(true);
    const handleNewUser =  async(e) => {
        e.preventDefault();
        try{
            //create a new displayName for the user
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredentials.user, {
                displayName: userName
            });
            setUser({...userCredentials.user, displayName: userName});
            alert(`${userName}, your account has been created successfully!`);
        }
        catch(err){
            alert(err.message);
        }
    }
    const handleLogin = async () => { //async function to handle login for users
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user)
        }
        catch (error){
            alert(error.message);
        }
    };

    return(
        <div>
            <div className = {styles.overlay}>
                <div className = {styles.login_or_create}>
                    {seeLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
                    {!seeLogin && <div className = {styles["field-container"]}>
                        <div className = {styles["input-wrapper"]}>
                            <label>Name: </label>
                            <input value = {userName} onChange = {(e => setUserName(e.target.value))} placeholder = "name" />
                        </div>
                    </div>}
                    <div className= {styles["field-container"]}>
                        <div className = {styles["input-wrapper"]}>
                            <label>Email: </label>
                            <input value = {email} onChange={(e=> setEmail(e.target.value))} placeholder="email"/>
                        </div>
                    </div>
                    <div className= {styles["field-container"]}>
                        <div className= {styles["input-wrapper"]}>
                            <label>Password: </label>
                            <input value = {password} onChange = {(e=> setPassword(e.target.value))} placeholder = "password" />
                        </div>
                    </div>
                    {seeLogin ?
                        <div className = {styles.account_actions}>
                            <button className= {styles.authentication} onClick = {handleLogin}>Login</button>
                            <button className = {styles.redirect} onClick = {() => setSeeLogin(!seeLogin)}>Don't have an account?</button>
                        </div>
                        :
                        <div className = {styles.account_actions}>
                            <button className= {styles.authentication} onClick = {handleNewUser}>Create Account</button>
                            <button className = {styles.redirect} onClick = {() => setSeeLogin(!seeLogin)}>Have an account? Login</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;
