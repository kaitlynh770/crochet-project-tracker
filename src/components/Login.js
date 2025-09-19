import { useState } from "react";
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from './Login.module.scss'
import visible from '../assets/visible.png';
import notVisible from '../assets/not-visible.png';

function Login({setUser}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [seeLogin, setSeeLogin] = useState(true);
    const [seePassword, setSeePassword] = useState(false);
    const handleNewUser =  async(e) => {
        e.preventDefault(); //helps to stop the page from reloading and losing our information when our form is submitted
        //pressing the enter key causes a browser to reload and discard all Javascript state and ongoing operations (this is the default behavior)
        try{
            //create a new displayName for the user
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredentials.user, {
                displayName: userName
            });

            await setDoc(doc(db, "users", userCredentials.user.uid), {
                displayName: userName,
                email: userCredentials.user.email,
                createdAt: new Date(),
            });
            setUser({...userCredentials.user, displayName: userName});
            alert(`${userName}, your account has been created successfully!`);
        }
        catch(err){
            alert(err.message);
        }
    }
    const handleLogin = async (e) => { //async function to handle login for users
        e.preventDefault();
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user)
        }
        catch (error){
            alert(error.message);
        }
    };

    const handleToggle = () => {
        setSeeLogin(!seeLogin);
        setEmail("");
        setPassword("");
        setUserName("")
    }

    return(
        <form onSubmit = {seeLogin ? handleLogin : handleNewUser}>
            <div className = {styles.overlay}>
                <div className = {styles.login_or_create}>
                    {seeLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
                    {!seeLogin && <div className = {styles["field-container"]}>
                        <div className = {styles["input-wrapper"]}>
                            <label>Name: </label>
                            <input value = {userName} onChange = {(e => setUserName(e.target.value))} placeholder = "Enter your name" />
                        </div>
                    </div>}
                    <div className= {styles["field-container"]}>
                        <div className = {styles["input-wrapper"]}>
                            <label>Email: </label>
                            <input value = {email} onChange={(e=> setEmail(e.target.value))} placeholder="Enter your email"/>
                        </div>
                    </div>
                    <div className= {styles["field-container"]}>
                        <div className= {styles["input-wrapper"]} style = {{position: "relative"}}>
                            <label>Password: </label>
                            <input value = {password} type = {seePassword ? "text" : "password"} onChange = {(e=> setPassword(e.target.value))} placeholder = "Enter your password" />
                            <img src = {seePassword ? visible : notVisible} className = {styles["toggle-icon"]} onClick = {() => setSeePassword(!seePassword)} tabIndex={0} />
                        </div>
                    </div>
                    <div className = {styles.account_actions}>
                        <button className = {styles.authentication} type = "submit">{seeLogin ? "Login" : "Create Account"}</button>
                        <button className = {styles.redirect} type = "button" onClick = {handleToggle}>{seeLogin ? "Dont have an account?" : "Have an account? Login"}</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login;
