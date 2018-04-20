import React from "react";
import {
  withStyles,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Tooltip
} from "material-ui";
import { Edit, Close } from "material-ui-icons";

import PropTypes from "prop-types";

import tableStyle from "variables/styles/tableStyle";
import {Button, ItemGrid} from "components";
import DialogEdit from "../Dialog/DialogContent";
import store from "../../redux/Store";

class ContentEditTable extends React.Component{
  state = {
    open: false,
    value: 'Dione',
    dialogData: {},
    code: ''
  };
  editClick = code => event => {
    this.setState({ open: true, code: code });
    this.props.allData.map((prop) => {
      if (prop.code === code){
        var dialogData = Object.assign({}, prop);
        this.setState({dialogData: dialogData});
      }
    });
  };
  handleClose = value => {
    this.setState({ value, open: false });
  };

  render(){
    const { classes, tableHead, tableData, tableHeaderColor, fullScreen, allData } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <DialogEdit
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          value={this.state.value}
          aria-labelledby="responsive-dialog-title"
          dialogData = {this.state.dialogData}
          code = {this.state.code}
        />
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key} hover = 'true'>
                  <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top"
                      title="Редактировать"
                      placement="top"
                      classes={{tooltip: classes.tooltip}}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={this.editClick(prop.code)}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.code}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.url}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.description}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.keywords}
                  </TableCell>
                  <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Удалить"
                      placement="top"
                      classes={{tooltip: classes.tooltip}}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon + " " + classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
            <Button color="white" round>
              Добавить перевод
            </Button>
          </TableBody>
        </Table>
      </div>
    );
  }
}

ContentEditTable.defaultProps = {
  tableHeaderColor: "gray"
};

ContentEditTable.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  allData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(ContentEditTable);
