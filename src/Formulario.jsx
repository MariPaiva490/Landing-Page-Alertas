
import { useState } from "react";
import "./Formulario.css";

function Formulario() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const data_atual = `${ano}-${mes}-${dia}`;

  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoDeRisco, setTipoDeRisco] = useState("");
  const [outroRisco, setOutroRisco] = useState("");
  const [imagem, setImagem] = useState(null);
  const [fonte, setFonte] = useState("");

  function enviarFormulario(event) {
    event.preventDefault();

    if (data > data_atual) {
      alert("A data não pode ser maior que a data atual!");
      return;
    }

    if (tipoDeRisco === "Outro" && outroRisco.trim().length < 3) {
      alert("Descreva o tipo de risco com pelo menos 3 caracteres.");
      return;
    }

    const riscoFinal =
      tipoDeRisco === "Outro"
        ? outroRisco.trim()
        : tipoDeRisco;

    alert(
      `Nome: ${nome}\n` +
      `Local: ${local}\n` +
      `Tipo de risco: ${riscoFinal}\n` +
      `Data: ${data}\n` +
      `Descrição: ${descricao}\n` +
      `Imagem: ${imagem ? imagem.name : "Nenhuma imagem anexada"}\n` +
      `Fonte: ${fonte.trim() || "Não informada"}`
    );
  }

  return (
    <form
      className="form-ocorrencia"
      onSubmit={enviarFormulario}
    >
      <label htmlFor="nome">Nome:</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        minLength={3}
        maxLength={30}
        required
      />

      <label htmlFor="local">Local:</label>
      <input
        id="local"
        type="text"
        value={local}
        onChange={(event) => setLocal(event.target.value)}
        minLength={3}
        maxLength={150}
        required
      />

      <label htmlFor="tipoRisco">Tipo de risco:</label>
      <select
        id="tipoRisco"
        value={tipoDeRisco}
        onChange={(event) => {
          setTipoDeRisco(event.target.value);

          if (event.target.value !== "Outro") {
            setOutroRisco("");
          }
        }}
        required
      >
        <option value="">Selecione um tipo de risco</option>
        <option value="Assalto">Assalto</option>
        <option value="Falta de energia">
          Falta de energia elétrica
        </option>
        <option value="Enchente">Enchente</option>
        <option value="Alagamento">Alagamento</option>
        <option value="Incêndio">Incêndio</option>
        <option value="Queda de árvore">Queda de árvore</option>
        <option value="Acidente de trânsito">
          Acidente de trânsito
        </option>
        <option value="Tempestade">Tempestade</option>
        <option value="Deslizamento">
          Deslizamento de terra
        </option>
        <option value="Outro">Outro</option>
      </select>

      {tipoDeRisco === "Outro" && (
        <>
          <label htmlFor="outroRisco">
            Descreva o tipo de risco:
          </label>
          <input
            id="outroRisco"
            type="text"
            value={outroRisco}
            onChange={(event) => setOutroRisco(event.target.value)}
            minLength={3}
            maxLength={100}
            required
          />
        </>
      )}

      <label htmlFor="data">Data da ocorrência:</label>
      <input
        id="data"
        type="date"
        value={data}
        max={data_atual}
        onChange={(event) => setData(event.target.value)}
        required
      />

      <label htmlFor="descricao">Descrição:</label>
      <textarea
        id="descricao"
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
        minLength={3}
        maxLength={300}
        required
      />

      <label htmlFor="imagem">
        Imagem da ocorrência (opcional):
      </label>
      <input
        id="imagem"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={(event) => {
          const arquivo = event.target.files[0];

          if (!arquivo) {
            setImagem(null);
            return;
          }

          const formatosPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp",
          ];

          if (!formatosPermitidos.includes(arquivo.type)) {
            alert(
              "Formato inválido! Envie somente JPG, JPEG, PNG ou WEBP."
            );
            event.target.value = "";
            setImagem(null);
            return;
          }

          setImagem(arquivo);
        }}
      />

      {imagem && (
        <p className="imagem-selecionada">
          Imagem selecionada: {imagem.name}
        </p>
      )}

      <p className="aviso-privacidade">
        <strong>ATENÇÃO:</strong> Não adicione imagens que exponham
        documentos, rostos, placas de veículos ou outros dados
        pessoais desnecessários.
      </p>

      <label htmlFor="fonte">Fonte (opcional):</label>
      <textarea
        id="fonte"
        value={fonte}
        onChange={(event) => setFonte(event.target.value)}
        maxLength={300}
        placeholder="Link ou referência da informação"
      />

      <button type="submit">Enviar ocorrência</button>
    </form>
  );
}

export default Formulario;
