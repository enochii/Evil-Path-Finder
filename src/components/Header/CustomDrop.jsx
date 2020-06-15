import React from "react";
import styled from "@emotion/styled";

// import "./demo-styles.css";
// import { options } from "./option";

import Select from "react-dropdown-select";

export default class CustomDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // disabled: this.props.disabled,
      dropdownRenderer: false,
      itemRenderer: true,
      handle: true,
      closeOnSelect: true,
      dropdownPosition: "bottom",
      direction: "ltr",
      dropdownHeight: "300px"
    };
  }
  onChange(nv, methods) {
      methods.addItem(nv);
      // this.props.onAlgoChange(nv);
      console.log(nv);
  }
  
  setValues = selectValues => this.setState({ selectValues });

  itemRenderer = ({ item, itemIndex, props, state, methods }) => (
    <div key={item} onClick={() => {this.onChange(item, methods)}} className={'algo-option'}>
      <div style={{ margin: "5px"}}>
        <span style={{float: "right"}}>{item}</span>
        <button className={"content-header__button--drop"}>X</button>
      </div>
    </div>
  );

    
  render() {
    return (
      <div className={this.props.className}>
          <div style={{ maxWidth: "350px", margin: "0 auto" }}>
            <StyledSelect            
              color={this.state.color}
              disabled={this.props.disabled}
              values={"www"}
              
              dropdownHandle={this.state.handle}
              dropdownHeight={this.state.dropdownHeight}
              options={this.props.options}
              onChange={this.props.onAlgoChange}
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
