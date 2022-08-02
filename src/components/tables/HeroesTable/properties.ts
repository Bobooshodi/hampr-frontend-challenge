import { TableProps } from "antd/lib/table";
import { Character } from "../../../models/types";

export interface HeroTableProps extends TableProps<Character> {
    rowSelection: any;
    data: Character[];
}