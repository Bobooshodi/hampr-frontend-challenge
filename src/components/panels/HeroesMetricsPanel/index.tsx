import { Col, Divider, Row } from "antd";
import { HeroesMetricsPanelProps } from "./properties";

const HeoresMetricsPanel = ({ metrics }: HeroesMetricsPanelProps) => {
  return (
    <div>
      <Row gutter={48}>
        <Col>
          <div>
            <p>Power</p>
            {!!metrics.powerMetric ? <p>{metrics.powerMetric}</p> : <p>-</p>}
          </div>
        </Col>
        <Col>
          <div>
            <p>Mobility</p>
            {!!metrics.mobilityMetric ? (
              <p>{metrics.mobilityMetric}</p>
            ) : (
              <p>-</p>
            )}
          </div>
        </Col>
        <Divider type="vertical" />
        <Col>
          <div>
            <p>Technique</p>
            {!!metrics.techniqueMetric ? (
              <p>{metrics.techniqueMetric}</p>
            ) : (
              <p>-</p>
            )}
          </div>
        </Col>
        <Divider type="vertical" />
        <Col>
          <div>
            <p>Survivability</p>
            {!!metrics.survivabilityMetric ? (
              <p>{metrics.survivabilityMetric}</p>
            ) : (
              <p>-</p>
            )}
          </div>
        </Col>
        <Col>
          <div>
            <p>Energy</p>
            {!!metrics.energyMetric ? <p>{metrics.energyMetric}</p> : <p>-</p>}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeoresMetricsPanel;
