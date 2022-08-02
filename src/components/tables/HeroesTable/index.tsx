import { Avatar, Button, Space, Table, Typography } from "antd";
import { ReactElement } from "react";
import { Character, CharacterAbility, CharacterTag } from "../../../models/types";
import { HeroTableProps } from "./properties";

const { Title, Text } = Typography;

const HeroesTable = ({ rowSelection, data }: HeroTableProps ) => { 

  const extractAbility = (
    name: string,
    abilities: CharacterAbility[]
  ): ReactElement => {
    if (!abilities || abilities.length < 1) {
      return <Text>0</Text>;
    }
    const ability = abilities.find(
      (ability: CharacterAbility) => ability.abilityName === name
    );

    return ability ? (
      ability.abilityScore === 10 ? (
        <Text type="danger">{ability.abilityScore}</Text>
      ) : (
        <Text>{ability.abilityScore}</Text>
      )
    ) : (
      <Text>0</Text>
    );
  };
 
  const columns = [
    {
      title: "Character",
      key: "character",
      render: (hero: Character) => (
        <div>
          <Space size={50}>
            <Avatar size="large" src={hero.thumbnail} />
            <Title className="heroName" level={5}>
              {hero.name}
            </Title>
          </Space>
        </div>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      render: (hero: Character) => (
        <Space size={8} wrap>
          {hero.tags.map((tag: CharacterTag) => (
            <Button
              type="primary"
              ghost
              key={tag.slot}
              shape="round"
              size="large"
            >
              {tag.tag_name}
            </Button>
          ))}
        </Space>
      ),
    },
    {
      title: "Power",
      key: "power",
      render: (hero: Character) => extractAbility("Power", hero.abilities),
    },
    {
      title: "Mobility",
      key: "mobility",
      render: (hero: Character) => extractAbility("Mobility", hero.abilities),
    },
    {
      title: "Technique",
      key: "technique",
      render: (hero: Character) => extractAbility("Technique", hero.abilities),
    },
    {
      title: "Survivability",
      key: "survivability",
      render: (hero: Character) =>
        extractAbility("Survivability", hero.abilities),
    },
    {
      title: "Energy",
      key: "energy",
      render: (hero: Character) => extractAbility("Energy", hero.abilities),
    },
  ];
  return (
    <Table
          rowKey="id"
          style={{ width: "80%" }}
          size="small"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
)}

export default HeroesTable ;