import React, { useState, useEffect } from "react";
import { Upload, Table, Card, Divider, Button, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { formatDate } from "./utils/date";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const columns = [
    { title: "Tipo", dataIndex: "type", key: "type" },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
      render: (value) => formatDate(value),
    },
    { title: "Produto", dataIndex: "product", key: "product" },
    { title: "Valor", dataIndex: "value", key: "value" },
    { title: "Vendedor", dataIndex: "seller", key: "seller" },
  ];

  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3333/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao buscar as transações", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

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

  return (
    <div>
      <Card title="Transações">
        <Row gutter={16}>
          <Col span={24}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>
                Clique para selecionar um arquivo (.txt)
              </Button>
            </Upload>
          </Col>
        </Row>
        <Divider style={{ marginTop: "50px" }} />
        <Row gutter={16}>
          <Col span={24}>
            <Table columns={columns} dataSource={transactions} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default App;
