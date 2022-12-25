import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

import Button from "react-bootstrap/Button";

function Listagem({ pnome, pinicio, pfim }) {
  const [url, setUrl] = useState("");

  const [root, setRoot] = useState();
  const [page, setPage] = useState();
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [saldototal, setSaldototal] = useState(0);
  const [saldonoperiodo, setSaldonoperiodo] = useState(0);

  const [contas, setContas] = useState([]);
  const [conta, setConta] = useState(1);

  let pageAtual = 0;

  useEffect(() => {
    findall();
    findallConta();
  }, [conta]);

  const findallConta = () => {
    fetch("http://localhost:8080/api/conta/findall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setContas(resp);
      })
      .catch((err) => console.log(err));
  };

  const pesquisarClick = () => {
    pageAtual = 0;
    findall();
  };

  const onPageChangeClick = (event) => {
    pageAtual = event.selected;
    // setPageAtual(event.selected);
    findall();
  };

  const handleChange = (e) => {
    console.log("handleChange", e.target.value);
    setConta(e.target.value);
  };

  const findall = () => {
    console.log("contallll,", conta)
    let urllocal = "?conta=" + conta;

    if (pnome !== "") {
      if (urllocal.length > 0) urllocal = urllocal + "&";
      else urllocal = urllocal + "?";
      urllocal = urllocal + "nome=" + pnome;
    }
    if (pinicio !== "") {
      if (urllocal.length > 0) urllocal = urllocal + "&";
      else urllocal = urllocal + "?";
      urllocal = urllocal + "inicio=" + pinicio;
    }

    if (pfim !== "") {
      if (urllocal.length > 0) urllocal = urllocal + "&";
      else urllocal = urllocal + "?";
      urllocal = urllocal + "fim=" + pfim;
    }
    setUrl(urllocal);

    if (urllocal.length > 0) urllocal = urllocal + "&";
    else urllocal = urllocal + "?";

    urllocal = urllocal + "page=" + pageAtual;

    urllocal = "http://localhost:8080/api/transferencia/findall" + urllocal;

    console.log("Url: ", urllocal);

    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    fetch(urllocal, {
      method: "GET",
      headers: headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setRoot(resp);
        setPage(resp.page);
        setContent(resp.page.content);
        setTotalPages(resp.page.totalPages);
        setSaldototal(resp.saldoTotal);
        setSaldonoperiodo(resp.saldoNoPeriodo);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container_listagem}>
      <section className={styles.pesquisar}>
        <label>
          Selecione uma Conta
          <select
            name="id_conta"
            id="id_conta"
            onChange={handleChange}
            value={conta}
          >
            {contas.map((ret) => (
              <option value={ret.id_conta} key={ret.id_conta}>
                {ret.id_conta}-{ret.nome_responsavel}
              </option>
            ))}
          </select>
        </label>

        <Button onClick={pesquisarClick} variant="dark">
          Pesquisar
        </Button>
      </section>

      <section className={styles.tabela}>
        <div className={styles.tabela_saldo}>
          <p>
            <label>Saldo total:</label>
            <span>R$ {saldototal}</span>{" "}
          </p>

          <p>
            <label>Saldo no período:</label>
            <span>R$ {saldonoperiodo}</span>{" "}
          </p>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Dados</th>
              <th>Valentia</th>
              <th>Tipo</th>
              <th>Nome operador transacionado</th>
            </tr>
          </thead>

          <tbody className="tabela_body">
            {content.length > 0 &&
              content.map((item) => (
                <tr key={item.id}>
                  <td className={styles.table_td_right}>{item.id}</td>
                  <td>{item.data_transferencia}</td>
                  <td className={styles.table_td_right}>R$ {item.valor}</td>
                  <td>{item.tipo}</td>
                  <td>{item.nome_operador_transacao}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </section>

      <section className="pagination">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={onPageChangeClick}
          onPageActive={pageAtual}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      </section>
    </div>
  );
}

export default Listagem;
