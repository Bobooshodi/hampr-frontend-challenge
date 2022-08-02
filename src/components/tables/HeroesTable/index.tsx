import { Table } from "antd";
import { HeroTableProps } from "./properties";

const HeroesTable = ({ rowSelection, columns, data }: HeroTableProps ) => (
    <Table
          rowKey="id"
          style={{ width: "80%" }}
          size="small"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
)

export default HeroesTable ;