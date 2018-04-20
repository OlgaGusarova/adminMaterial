import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField
} from "material-ui";

import PropTypes from "prop-types";

import {Button, ItemGrid} from "components";
import store from "../../redux/Store";

class DialogEdit extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state.value = this.props.value;
    this.state.dialogData = this.props.dialogData;
  }

  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.dialogData !== this.props.dialogData) {
      this.setState({ value: nextProps.value, dialogData: nextProps.dialogData });
    }
  }

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    var tableTranslit = [],
        dialogData = Object.assign({}, this.state.dialogData);
    Object.keys(dialogData).map((prop) => {
      if(prop === 'body'){
        delete dialogData[prop];
      }
    });
    tableTranslit.push(dialogData);
    console.log(tableTranslit);
    store.dispatch({
      type: 'CONTENT_TRANSLIT_CHANGED',
      code: this.props.code,
      tableTranslit: tableTranslit,
      translations: this.state.dialogData
    });
    this.props.onClose(this.state.value);
  };

  inputChange = name => event => {
    var dialogData = this.state.dialogData;
    dialogData[name] = event.target.value;
    this.setState({dialogData: dialogData});
  };

  render(){
    const { value, ...other } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        aria-labelledby="responsive-dialog-title"
        {...other}
      >
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <TextField
                  required
                  label="Код"
                  value={this.state.dialogData.code}
                  onChange={this.inputChange('code')}
                  margin="normal"
                  fullWidth
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12}>
                <TextField
                  label="Имя"
                  value={this.state.dialogData.title}
                  onChange={this.inputChange('title')}
                  margin="normal"
                  fullWidth
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12}>
                <TextField
                  label="URL"
                  value={this.state.dialogData.url}
                  onChange={this.inputChange('url')}
                  margin="normal"
                  fullWidth
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12}>
                <TextField
                  multiline
                  rowsMax="4"
                  label="Мета описание"
                  value={this.state.dialogData.description}
                  onChange={this.inputChange('description')}
                  margin="normal"
                  fullWidth
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12}>
                <TextField
                  label="Ключевые слова"
                  value={this.state.dialogData.keywords}
                  onChange={this.inputChange('keywords')}
                  margin="normal"
                  fullWidth
                />
              </ItemGrid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="white">
            Отмена
          </Button>
          <Button onClick={this.handleOk} color="success" autoFocus>
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

DialogEdit.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
  dialogData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default DialogEdit;