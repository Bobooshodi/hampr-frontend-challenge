export interface HeroTagFilterProp {
    tags: string[];
    selectedTag: string;
    onTagClick: (tag?: string) => void;
    resetFilters: () => void;
}