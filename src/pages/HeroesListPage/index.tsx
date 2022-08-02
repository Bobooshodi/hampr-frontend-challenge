import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Divider,
  Input,
  Space,
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
import HeroesTable from "../../components/tables/HeroesTable";
import HeoresMetricsPanel from "../../components/panels/HeroesMetricsPanel";
import HeroTagFilter from "../../components/controls/HeroTagFilter";
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
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (hero: Character) => ({
      disabled:
        selectedRowKeys.length > 5 && !selectedRowKeys.includes(hero.id),
    }),
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

  const resetFilters = () => {
    setSelectedFilter("");
    setSelectedHeroes([]);
    setHeroes(heroesData);
    setSelectedRowKeys([]);
    setTeamAbilityMetrics({
      powerMetric: 0,
      mobilityMetric: 0,
      techniqueMetric: 0,
      survivabilityMetric: 0,
      energyMetricL: 0,
    });
  };

 

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
          <HeoresMetricsPanel metrics={teamAbilityMetrics} />
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

      <HeroTagFilter tags={tagsFilters} selectedTag={selectedFilter} onTagClick={filterHeroes} resetFilters={resetFilters} />

      <div className="heroTable">
        <HeroesTable
          rowSelection={rowSelection}
          data={heroes}
        />
      </div>
    </div>
  );
};

export default HerosListPage;
