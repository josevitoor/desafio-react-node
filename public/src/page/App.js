import React from "react";
import {
  Upload,
  Table,
  Card,
  Divider,
  Button,
  Typography,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { formatDate, formatValueInReal, getByKey } from "../utils/utils";
import DadosEstaticos from "../utils/dadosEstaticos";
import AppStore from "../store/AppStore";

const { Title } = Typography;

const App = () => {
  const store = AppStore();
  const columns = [
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (text) => getByKey(DadosEstaticos.getTipo(), text),
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    { title: "Produto", dataIndex: "product", key: "product" },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      render: (value) => formatValueInReal(value),
    },
    { title: "Vendedor", dataIndex: "seller", key: "seller" },
  ];

  return (
    <div>
      <Card title="Transações">
        <Row gutter={16}>
          <Col span={24}>
            <Upload {...store.uploadProps}>
              <Button icon={<UploadOutlined />}>
                Clique para selecionar um arquivo (.txt)
              </Button>
            </Upload>
          </Col>
        </Row>
        <Divider style={{ marginTop: "50px" }} />
        <Row gutter={16}>
          <Typography>
            <Title>Amount: {formatValueInReal(store.sum)}</Title>
          </Typography>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Table columns={columns} dataSource={store.transactions} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default App;
