import React from "react";
import {Grid} from "material-ui";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {RegularCard, ItemGrid} from "components";
import getContent from "../../restFullRequest/content/getContent";
import Table from '../../components/Table/ContentTable';

class TableList extends React.Component {

  constructor(props){
    super(props);
    getContent();
  }

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Контентные страницы"
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["", "Название", "Сортировка", "Активность", ""]}
                  tableData={this.props.contentData}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    contentData: store['contentReducer'].contentData
  }
};

export default withRouter(connect(mapStateToProps)(TableList));
