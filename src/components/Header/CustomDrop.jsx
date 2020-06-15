import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

// import "./demo-styles.css";

// import { options } from "./options";

import Select from "react-dropdown-select";

export default class CustomDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      itemRenderer: true,
      handle: true,

      labelField: "label",
      valueField: "value",
      closeOnSelect: true,
      dropdownHeight: "300px"
    };
  }
  setValues = selectValues => this.setState({ selectValues });

  itemRenderer = ({ item, itemIndex, props, state, methods }) => (
    <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
      <div style={{ margin: "10px" }}>
        <input type="checkbox" checked={methods.isSelected(item)} />
        &nbsp;&nbsp;&nbsp;{item[props.labelField]}
      </div>
    </div>
  );

  render() {
    console.log(this.props.options);
    return (
      <div className={this.props.className}>
        <div style={{ maxWidth: "350px", margin: "0 auto" }}>
          <StyledSelect
            disabled={this.state.disabled}
            dropdownHandle={this.state.handle}
            dropdownHeight={this.state.dropdownHeight}
            direction={this.state.direction}
            // values={[options.find(opt => opt.username === "Delphine")]}
            labelField={this.state.labelField}
            valueField={this.state.valueField}
            options={this.props.options}
            // onChange={values => this.setValues(values)}
            closeOnSelect={this.state.closeOnSelect}
            dropdownPosition={this.state.dropdownPosition}
            itemRenderer={
              this.state.itemRenderer
                ? (item, itemIndex, props, state, methods) =>
                    this.itemRenderer(item, itemIndex, props, state, methods)
                : undefined
            }
          />
        </div>
      </div>
    );
  }
}

const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;