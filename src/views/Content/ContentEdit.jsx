import React from "react";
import {Grid, Checkbox, FormControlLabel, TextField } from "material-ui";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  RegularCard,
  ItemGrid,
  Button,
  CustomInput
} from "components";
import getContentInfo from "../../restFullRequest/content/getContentDescriptInfo";
import Table from "../../components/Table/ContentEditTable";
import store from "../../redux/Store";

class ContentEdit extends React.Component {
  constructor(props){
    super(props);
    getContentInfo(this.props.match.params.id);
  };

  valueChange = name => event => {
    store.dispatch({
      type: 'CONTENT_FIELD_CHANGED',
      name: name,
      value: event.target.value
    })
  };

  changeCheck = isChecked => event  => {
    var value = !isChecked,
        name = event.target.name;
    store.dispatch({
      type: 'CONTENT_FIELD_CHANGED',
      name: name,
      value: value
    })
  };

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Редактирование контента"
              content={
                <div>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={8}>
                      <TextField
                        required
                        inputRef={el => this.inner_name = el}
                        label="Название"
                        value={this.props.inner_name}
                        margin="normal"
                        onChange = {this.valueChange('inner_name')}
                        fullWidth
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <TextField
                        type='number'
                        label="Сортировка"
                        inputRef={el => this.sort = el}
                        value={this.props.sort}
                        onChange = {this.valueChange('sort')}
                        margin="normal"
                        fullWidth
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="active"
                            checked={this.props.active}
                            color="primary"
                            onClick = {this.changeCheck(this.props.active)}
                          />
                        }
                        label="Активность"
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["", "Код", "Название", "URL", "Мета описание", "Ключевые слова", ""]}
                        tableData={this.props.tableTranslit}
                        allData = {this.props.translations}
                      />
                    </ItemGrid>
                  </Grid>
                </div>
              }
              footer={<Button color="primary">Сохранить</Button>}
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    fullData: store['contentReducer'].fullData,
    inner_name: store['contentReducer'].inner_name,
    sort: store['contentReducer'].sort,
    translations: store['contentReducer'].translations,
    active: store['contentReducer'].active,
    tableTranslit: store['contentReducer'].tableTranslit
  }
};

export default withRouter(connect(mapStateToProps)(ContentEdit));
