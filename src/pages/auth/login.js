import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Register.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);
      alert("Login realizado com sucesso!");
      router.push("/");
    } catch (error) {
      alert("Erro ao realizar login: " + error.response.data.message || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>Tocloc</header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
