import { useState } from "react";
import styles from "./style.module.css";
import Listagem from "../Transferencia/Listagem";

function Formulario() {
  const [nome, setNome] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.formulario}>
        <section className={styles.filtro}>
          <div className={styles.input_data}>
            <label htmlFor="">Data de inicio</label>
            <input
              value={inicio}
              type="date"
              onChange={(e) => setInicio(e.target.value)}
            />
          </div>

          <div className={styles.input_data}>
            <label htmlFor="">Data de Fim</label>
            <input
              value={fim}
              type="date"
              onChange={(e) => setFim(e.target.value)}
            />
          </div>
          <div className={styles.input_text}>
            <label htmlFor="">Nome operador transacionado</label>
            <input
              value={nome}
              type="text"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </section>

        <section className={styles.listagem}>
          <Listagem pnome={nome} pinicio={inicio} pfim={fim} />
        </section>
      </div>
    </div>
  );
}

export default Formulario;
