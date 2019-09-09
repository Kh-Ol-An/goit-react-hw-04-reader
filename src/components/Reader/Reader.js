import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Publication from '../Publication/Publication';
import Counter from '../Counter/Counter';
import Controls from '../Controls/Controls';
import publications from '../publications';
import s from './Reader.module.css';

const INITIAL_STATE = {
  publication: publications[0],
  total: publications.length,
  currentValue: 1,
  disabledPrev: true,
  disabledNext: false,
};

const getItemFromLocation = location => queryString.parse(location.search).item;

export default class Reader extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
  };

  state = { ...INITIAL_STATE };

  async componentDidMount() {
    const { history, location } = await this.props;
    const searchItem = await getItemFromLocation(location);
    if (+searchItem) {
      this.setState({
        publication: publications[+searchItem - 1],
        currentValue: +searchItem,
      });
    }
    if (+searchItem === 1) {
      this.setState({
        disabledPrev: true,
        disabledNext: false,
      });
    } else if (+searchItem === publications.length) {
      this.setState({
        disabledPrev: false,
        disabledNext: true,
      });
    } else if (+searchItem > 1 && +searchItem < publications.length) {
      this.setState({
        disabledPrev: false,
        disabledNext: false,
      });
    }
    const { currentValue } = await this.state;
    await history.push({
      ...location,
      search: `item=${currentValue}`,
    });
  }

  componentDidUpdate(prevProps) {
    const { currentValue } = this.state;
    const { history, location } = this.props;
    const prevPropItem = getItemFromLocation(prevProps.location);
    if (+prevPropItem !== currentValue) {
      history.push({
        ...location,
        search: `item=${currentValue}`,
      });
    }
  }

  handlePrevPub = () => {
    this.setState(prevState => ({
      publication: publications[prevState.currentValue - 2],
      currentValue: prevState.currentValue - 1,
      disabledPrev: prevState.currentValue === 2 && !prevState.disabledPrev,
      disabledNext:
        prevState.currentValue === publications.length &&
        !prevState.disabledNext,
    }));
  };

  handleNextPub = () => {
    this.setState(prevState => ({
      publication: publications[prevState.currentValue],
      currentValue: prevState.currentValue + 1,
      disabledPrev: prevState.currentValue === 1 && !prevState.disabledPrev,
      disabledNext:
        prevState.currentValue === publications.length - 1 &&
        !prevState.disabledNext,
    }));
  };

  render() {
    const {
      publication,
      total,
      currentValue,
      disabledPrev,
      disabledNext,
    } = this.state;
    return (
      <div className={s.containerReader}>
        <Publication publication={publication} />
        <Counter currentValue={currentValue} total={total} />
        <Controls
          disabledPrev={disabledPrev}
          disabledNext={disabledNext}
          handlePrevPub={this.handlePrevPub}
          handleNextPub={this.handleNextPub}
        />
      </div>
    );
  }
}
