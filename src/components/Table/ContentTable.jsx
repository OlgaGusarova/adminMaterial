import React from "react";
import {
  withStyles,
  Checkbox,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TableSortLabel,
  Tooltip
} from "material-ui";
import { Edit, Close } from "material-ui-icons";

import PropTypes from "prop-types";

import tableStyle from "variables/styles/tableStyle";
import store from "../../redux/Store";

class CustomTable extends React.Component{

  handleToggle = isChecked => event => {
    var value = !isChecked,
        id = event.target.name;
    store.dispatch({
      type: 'CONTENT_ACTIVE_CHANGED',
      active: value,
      id: id
    })
  };

  render(){
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    return (
      <div className={classes.tableResponsive}>
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
              var editUrl = "/content/update/" + prop.id;
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
                        href = {editUrl}
                        className={classes.tableActionButton}
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
                    {prop.inner_name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.sort}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Checkbox
                      checked={prop.active}
                      name = {prop.id}
                      onClick={this.handleToggle(prop.active)}
                    />
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
          </TableBody>
        </Table>
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
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
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
