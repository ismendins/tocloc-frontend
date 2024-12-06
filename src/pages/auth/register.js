import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Register.module.css";
import { useRouter } from "next/router";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    isAdmin: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", formData);
      alert("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.response.data.message || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>Tocloc</header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="phone_number"
          placeholder="Telefone"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <div className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            Você é um locador?
          </label>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;