import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import HistogramPlotPanel from "../../components/histogramPlotPanel";
import Wrapper from "./index.style";
import appActions from "../../redux/app/actions";

const {} = appActions;

class PopulationTab extends Component {
  render() {
    const { t, loading, selectedFile, plots } = this.props;
    if (!selectedFile) return null;
    let plotRows = plots.map((d, index) => {
      let plotComponent = null;
      if (d.type === "histogram") {
        plotComponent = (
          <HistogramPlotPanel
            {...{
              data: d.data,
              title: t(`metadata.${d.id}.full`),
              visible: d.data,
              markValue: selectedFile.metadata[d.id],
              loading,
            }}
          />
        );
      }
      return plotComponent;
    });

    const pairs = plotRows.reduce((acc, cur, idx) => {
      if (idx % 2 === 0) {
        acc.push([cur, plotRows[idx + 1]]);
      }
      return acc;
    }, []);

    return (
      <Wrapper>
        {pairs.map((pair, index) => (
          <Row
            key={index}
            id={`row-${index}}`}
            className="ant-panel-container ant-home-plot-container"
            gutter={16}
          >
            {pair.map((plotComponent, i) => (
              <Col className="gutter-row" span={Math.floor(24 / pair.length)}>
                {plotComponent}
              </Col>
            ))}
          </Row>
        ))}
      </Wrapper>
    );
  }
}
PopulationTab.propTypes = {};
PopulationTab.defaultProps = {};
const mapDispatchToProps = (dispatch) => ({});
const mapStateToProps = (state) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("common")(PopulationTab));
