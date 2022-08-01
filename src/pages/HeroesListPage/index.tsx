import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { find, sumBy, uniq } from "lodash";

import "./style.css";
import jsonData from "../../assets/data/characters.json";
import type {
  Character,
  CharacterAbility,
  CharacterTag,
} from "../../models/types";
import { ReactElement, useState } from "react";
const heroesData: Character[] = jsonData as Character[];

const { Title, Text } = Typography;

const heroesTags = heroesData.reduce((acc: string[], curr: Character) => {
  const heroTags = curr.tags?.map((tag: CharacterTag) => tag.tag_name);
  return acc.concat(heroTags);
}, []);
const tagsFilters = uniq(heroesTags);

const HerosListPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [heroes, setHeroes] = useState<Character[]>(heroesData);
  const [selectedHeroes, setSelectedHeroes] = useState<Character[]>([]);
  const [teamAbilityMetrics, setTeamAbilityMetrics] = useState<any>({});

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const heroes = heroesData.filter((hero: Character) =>
      newSelectedRowKeys.includes(hero.id)
    );
    setSelectedHeroes(heroes);

    calculateTeamMetrics();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (hero: Character) => ({
      disabled:
        selectedRowKeys.length > 5 && !selectedRowKeys.includes(hero.id),
    }),
  };

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

  const filterHeroes = (tag?: string) => {
    let heroes = selectedHeroes;
    if (!!tag) {
      setSelectedFilter(tag);
      heroes = heroesData.filter((hero: Character) =>
        find(hero.tags, (heroTag) => heroTag.tag_name === tag)
      );
    } else {
      setSelectedFilter("myteam");
    }
    setHeroes(heroes);
  };

  const handleHeroesSearch = (e: any) => {
    const searchValue = e.target.value.toLowerCase();

    const heroes = heroesData.filter(
      (hero: Character) =>
        hero.name.toLowerCase().includes(searchValue) ||
        find(hero.tags, (heroTag) =>
          heroTag.tag_name.toLowerCase().includes(searchValue)
        )
    );

    setHeroes(heroes);
  };

  const getHeroAbilityScore = (hero: Character, abilityName: string) => {
    const ability = hero.abilities.find(
      (ability) => ability.abilityName === abilityName
    );

    return ability?.abilityScore || 0;
  };

  const calculateTeamMetrics = () => {
    const powerMetric =
      sumBy(selectedHeroes, (hero: Character) =>
        getHeroAbilityScore(hero, "Power")
      ) / selectedHeroes.length;
    const mobilityMetric =
      sumBy(selectedHeroes, (hero: Character) =>
        getHeroAbilityScore(hero, "Mobility")
      ) / selectedHeroes.length;
    const techniqueMetric =
      sumBy(selectedHeroes, (hero: Character) =>
        getHeroAbilityScore(hero, "Technique")
      ) / selectedHeroes.length;
    const survivabilityMetric =
      sumBy(selectedHeroes, (hero: Character) =>
        getHeroAbilityScore(hero, "Survivability")
      ) / selectedHeroes.length;
    const energyMetric =
      sumBy(selectedHeroes, (hero: Character) =>
        getHeroAbilityScore(hero, "Energy")
      ) / selectedHeroes.length;

    setTeamAbilityMetrics({
      powerMetric,
      mobilityMetric,
      techniqueMetric,
      survivabilityMetric,
      energyMetric,
    });
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
    <div>
      <div className="header">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div>
            <Title level={3}>Select Your squad to defend earthrealm</Title>
          </div>
          <div>
            {selectedHeroes.map((hero: Character) => (
              <Avatar size={75} key={hero.id} src={hero.thumbnail} />
            ))}
          </div>
          <div>
            <Row gutter={48}>
              <Col>
                <div>
                  <p>Power</p>
                  {selectedHeroes.length > 0 ? (
                    <p>{teamAbilityMetrics.powerMetric}</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </Col>
              <Col>
                <div>
                  <p>Mobility</p>
                  {selectedHeroes.length > 0 ? (
                    <p>{teamAbilityMetrics.mobilityMetric}</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </Col>
              <Divider type="vertical" />
              <Col>
                <div>
                  <p>Technique</p>
                  {selectedHeroes.length > 0 ? (
                    <p>{teamAbilityMetrics.techniqueMetric}</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </Col>
              <Divider type="vertical" />
              <Col>
                <div>
                  <p>Survivability</p>
                  {selectedHeroes.length > 0 ? (
                    <p>{teamAbilityMetrics.survivabilityMetric}</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </Col>
              <Col>
                <div>
                  <p>Energy</p>
                  {selectedHeroes.length > 0 ? (
                    <p>{teamAbilityMetrics.energyMetric}</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <p> * Totals as average for squad</p>
        </Space>
      </div>

      <Divider>
        <Input
          style={{ width: 500 }}
          prefix={<SearchOutlined />}
          onChange={handleHeroesSearch}
          placeholder="Search Characters"
        />
      </Divider>

      <Space size={[8, 16]} wrap>
        {tagsFilters.map((tag: string) => (
          <Button
            key={tag}
            shape="round"
            size="large"
            onClick={() => filterHeroes(tag)}
            type={selectedFilter === tag ? "primary" : "default"}
          >
            {tag}
          </Button>
        ))}
        <Button
          key="myteam"
          shape="round"
          size="large"
          onClick={() => filterHeroes()}
          type={selectedFilter === "myteam" ? "primary" : "default"}
        >
          My Team
        </Button>
        <Button
          type="link"
          onClick={() => {
            setSelectedFilter("");
            setSelectedHeroes([]);
            setHeroes(heroesData);
            setSelectedRowKeys([]);
          }}
        >
          Clear All
        </Button>
      </Space>
      <div className="heroTable">
        <Table
          rowKey="id"
          style={{ width: "80%" }}
          size="small"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={heroes}
        />
      </div>
    </div>
  );
};

export default HerosListPage;
