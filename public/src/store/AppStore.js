import { useState, useEffect } from "react";
import { showNotification } from "../utils/utils";

const AppStore = () => {
  const port = process.env.PORT || 3333;
  const [transactions, setTransactions] = useState([]);
  const [sum, setSum] = useState(0);

  const uploadProps = {
    name: "file",
    accept: ".txt",
    multiple: false,
    action: `http://localhost:${port}/upload`,
    onChange(info) {
      if (info.file.status === "done") {
        showNotification("success", "", "Upload Realizado com Sucesso");
        getTransactions(true);
      } else if (info.file.status === "error") {
        showNotification("error", "", "Erro ao Realizar Upload do Arquivo");
      }
    },
  };

  async function getTransactions(showMessage = false) {
    try {
      const response = await fetch(`http://localhost:${port}/transactions`);
      const data = await response.json();
      const transactions = data && data.transactions ? data.transactions : [];
      setTransactions(transactions);
      setSum(sumValues(transactions));
      showMessage && showNotification("success", "", data.message);
    } catch (error) {
      showNotification("error", "", "Erro ao Carregar as Transações");
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
