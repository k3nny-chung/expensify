import React from 'react';
import {connect} from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import {DateRangePicker} from 'react-dates';


class ExpenseFilter extends React.Component {
    state = {
        calendarFocused: null
    };
    
    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    textOnChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    sortOnChange = (e) => { 
        if (e.target.value === 'date'){
            this.props.sortByDate();
        }else if (e.target.value === 'amount'){
            this.props.sortByAmount();
        }
    };
    
    datePickerOnFocusChange = (focusedInput) => {
        this.setState({ calendarFocused: focusedInput });
    };
    
    render() {
        return  (
            <div>
                Search: 
                <input type="text" value={this.props.filters.text} onChange={this.textOnChange}/>
                 Sort by:
                 <select value={this.props.filters.sortBy} onChange={this.sortOnChange}>
                     <option value="">--Select--</option>
                     <option value="date">Date</option>
                     <option value="amount">Amount</option>
                 </select>
                 <DateRangePicker startDate={this.props.filters.startDate}
                                  endDate={this.props.filters.endDate}
                                  onDatesChange={this.onDatesChange}
                                  focusedInput={this.state.calendarFocused}
                                  onFocusChange={this.datePickerOnFocusChange}
                                  showClearDates={true}
                                  numberOfMonths={1}
                                  isOutsideRange={() => false}
                                  />
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (start) => dispatch(setStartDate(start)),
    setEndDate: (end) => dispatch(setEndDate(end))
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilter);
