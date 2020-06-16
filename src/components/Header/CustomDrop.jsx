import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { ORGINAL_ALGOS } from "constants.js"

// import "./demo-styles.css";

// import { options } from "./options";

import Select from "react-dropdown-select";
import { rmLocalAlgoList } from "components/Editor/evil";

export default class CustomDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // disabled: false,
      itemRenderer: true,
      // handle: true,

      labelField: "label",
      valueField: "value",
      closeOnSelect: true,
      dropdownHeight: "300px"
    };
  }
  // setValues = selectValues => this.setState({ selectValues });
  onChange(val) {
    // console.log(val);
    var algo = val[0]['value'];
    // console.log(algo);
    this.props.onAlgoChange(algo);
  }

  deleteAlgoByName(name) {
    console.log(name);
    rmLocalAlgoList(name);
  }

  itemRenderer = ({ item, itemIndex, props, state, methods }) => {
    return (itemIndex + ORGINAL_ALGOS.length<this.props.options.length)?
    (
    <div key={item[props.valueField]} onClick={() => methods.addItem(item)} className={'algo-option'}>
      <div style={{ margin: "5px" }}>
        <span style={{float: "right"}}>{item[props.labelField]}</span>
        {/* 少些了 箭头函数还行，然后渲染期间所有按钮onclick都执行 。。。*/}
        <button className='content-header__button--drop' onClick={() => this.deleteAlgoByName(item[props.valueField])}>X</button>
      </div>
    </div>
  ):(
    <div key={item[props.valueField]} onClick={() => methods.addItem(item)} className={'algo-option'}>
      <div style={{ margin: "5px" }}>
        <span style={{float: "right"}}>{item[props.labelField]}</span>
      </div>
    </div>
  );
}

  render() {
    // console.log(this.props.options);
    return (
      <div className={this.props.className}>
        <div style={{ maxWidth: "350px", margin: "0 auto" }}>
          <StyledSelect
            disabled={this.props.disabled}
            dropdownHandle={this.state.handle}
            dropdownHeight={this.state.dropdownHeight}
            direction={this.state.direction}
            values={[this.props.options.find(opt => true)]}
            labelField={this.state.labelField}
            valueField={this.state.valueField}
            options={this.props.options}
            onChange={values => this.onChange(values)}
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