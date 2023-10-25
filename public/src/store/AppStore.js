import { useState, useEffect } from "react";

const AppStore = () => {
  const [transactions, setTransactions] = useState([]);
  const [sum, setSum] = useState(0);

  const uploadProps = {
    name: "file",
    accept: ".txt",
    multiple: false,
    action: "http://localhost:3333/upload",
    onChange(info) {
      if (info.file.status === "done") {
        console.log("Arquivo enviado com sucesso");
        getTransactions();
      } else if (info.file.status === "error") {
        console.error("Erro ao enviar o arquivo");
      }
    },
  };

  async function getTransactions() {
    try {
      const response = await fetch("http://localhost:3333/transactions");
      const data = await response.json();
      setTransactions(data);
      setSum(sumValues(data));
    } catch (error) {
      console.error("Erro ao buscar as transações", error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  function sumValues(transactions) {
    let sumValue = 0;
    transactions.forEach((t) => {
      if (t.type === 3) {
        setSum((sumValue -= t.value));
      } else {
        setSum((sumValue += t.value));
      }
    });

    return sumValue;
  }

  return {
    transactions,
    uploadProps,
    getTransactions,
    sum,
  };
};

export default AppStore;
