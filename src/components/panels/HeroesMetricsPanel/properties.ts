export interface HeroesMetricsPanelProps {
    metrics: AbilityMetrics;
}

type AbilityMetrics = {
    powerMetric: number;
    mobilityMetric: number;
    techniqueMetric: number;
    survivabilityMetric: number;
    energyMetric: number;
}