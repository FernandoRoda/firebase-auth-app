import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseLogo from './assets/firebase-logo.png';
import ListaDeTarefas from './ListaDeTarefas';


// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWt7__BetJtFOZGXntl7CaXOxBWZeSq9w",
  authDomain: "etec-8f1c9.firebaseapp.com",
  databaseURL: "https://etec-8f1c9-default-rtdb.firebaseio.com",
  projectId: "etec-8f1c9",
  storageBucket: "etec-8f1c9.appspot.com",
  messagingSenderId: "1070246420297",
  appId: "1:1070246420297:web:f26c0b33636b63024a0498",
  measurementId: "G-37FSGMMWSE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // Novo estado para controlar o estado de login

  useEffect(() => {
    // Verificar se o usuário está logado ao montar o componente
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
      setLoggedIn(true);
    } catch (err) {
      setError(err.message);
      setUser(null);
      setLoggedIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
      setLoggedIn(true);
    } catch (err) {
      setError(err.message);
      setUser(null);
      setLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      setLoggedIn(false);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">

          <table className="tabela">
          <img src={firebaseLogo} alt="Firebase Logo" />

          <h1>Autenticação no Firebase</h1>
          {!loggedIn && (
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleGoogleLogin}>Login com Google</button>
            </div>
          )}
          {loggedIn && user && (
            <div>
              <h2>Dados do Usuário:</h2>
              <p>Nome: {user.displayName || 'Não fornecido'}</p>
              <p>Email: {user.email}</p>
              <p>ID do Usuário: {user.uid}</p>
              <ListaDeTarefas /> {}
              <button onClick={handleLogout}>Sair</button>
            </div>
          )}
          {error && <p>{error}</p>}

          </table>
      </header>
    </div>

    
  );
}

export default App;
