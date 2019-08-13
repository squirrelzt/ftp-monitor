import React, { PureComponent } from "react";

export class AdvancedTabSelector extends PureComponent {

 

  render() {
    const { options, value, onChange } = this.props;
    console.log(this.props.children);
    console.log(this.props.value)
    return (
      <div className="tab-selector">
        {/* <ul>
          {options.map(opt => (
            <li
              key={opt.value}
              className={`tab-item ${
                opt.value === this.props.value ? "selected" : ""
              }`}
              onClick={() => this.props.onChange(opt.value)}
            >
              {opt.name}
            </li>
          ))}
        </ul>
        <br />
        <br /> */}
        {this.props.value && this.props.children(this.props.value)}
      </div>
    );
  }
}

const colors = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Orange", value: "orange" }
];

const animals = [
  { name: "Tiger", value: "tiger" },
  { name: "Elephant", value: "elephant" },
  { name: "Cow", value: "cow" }
];

export default class AdvancedTabSelectorSample extends PureComponent {
  state = {
    color: null
  };
  render() {
    return (
      <div>
        <h3>Select color: </h3>
        <AdvancedTabSelector
        //   options={colors}
        //   value={this.state.color}
        //   onChange={c => this.setState({ color: c })}
        value="red"
        >
          {color => (
            <span
              style={{
                display: "inline-block",
                backgroundColor: color,
                width: "40px",
                height: "40px"
              }}
            />
          )}
        </AdvancedTabSelector>
        <br />
        <br />
        <br />
        <h3>Select animal: </h3>
        <AdvancedTabSelector
          options={animals}
          value={this.state.animal}
          onChange={c => this.setState({ animal: c })}
        >
          {animal => (
            <img width="100px" src={require(`../../images/${animal}.png`)} />
          )}
        </AdvancedTabSelector>
      </div>
    );
  }
}
