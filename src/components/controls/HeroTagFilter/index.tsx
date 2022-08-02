import { Button, Space } from "antd";
import { HeroTagFilterProp } from "./properties";

function HeroTagFilter({ onTagClick, resetFilters, selectedTag, tags }: HeroTagFilterProp) {
    return (
        <Space size={[8, 16]} wrap>
        {tags.map((tag: string) => (
          <Button
            key={tag}
            shape="round"
            size="large"
            onClick={() => onTagClick(tag)}
            type={selectedTag === tag ? "primary" : "default"}
          >
            {tag}
          </Button>
        ))}
        <Button
          key="myteam"
          shape="round"
          size="large"
          onClick={() => onTagClick()}
          type={selectedTag === "myteam" ? "primary" : "default"}
        >
          My Team
        </Button>
        <Button
          type="link"
          onClick={() => {
            resetFilters();
          }}
        >
          Clear All
        </Button>
      </Space>
    );
}

export default HeroTagFilter;