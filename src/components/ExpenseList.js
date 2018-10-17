import React from 'react';
import {connect} from 'react-redux';
import ExpenseItem from './ExpenseItem';
import {fetchExpenses} from '../actions/expenses';
import filteredExpenses from '../selectors/expenses';
import Pagination from './Pagination';

export class ExpenseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 3                                
        };

        //this.state.items = this.getPageItems(this.state.pageNumber, this.state.pageSize);
        //this.state.totalPages = this.getTotalPages(this.state.pageSize);
    }
    
    componentDidMount() {
        this.props.fetch(this.state.pageSize);
    }

    // getPageItems(pageNumber, pageSize) {
    //     if (!this.props.expenses || this.props.expenses.length === 0) {
    //         return [];
    //     }

    //     let endIndex = pageNumber * pageSize - 1;
    //     if (this.props.expenses.length - 1 < endIndex) {
    //         endIndex = this.props.expenses.length;
    //     }

    //     const startIndex = pageNumber * pageSize - pageSize;
    //     return this.props.expenses.slice(startIndex, endIndex + 1);
    // }

    getTotalPages(totalCount, pageSize) {
        return Math.ceil(totalCount/pageSize);
    }

    onNextPageClick = () => {
        const { expenses, count, fetch } = this.props; 
        const totalPages = this.getTotalPages(count, this.state.pageSize);
        
        if (this.state.pageNumber + 1 <= totalPages) {
            const nextExpense = expenses && expenses.length > 0 ? expenses[expenses.length - 1] : null;         
            fetch(this.state.pageSize, nextExpense)
                .then(() => {
                    this.setState((state) => {        
                        return {                    
                            pageNumber: state.pageNumber + 1                  
                        };                
                    });
                });            
        }else {
            this.setState((state) => ({}));
        }
    }

    onPrevPageClick = () => {
        if (this.state.pageNumber > 1) {
            const { expenses, fetch } = this.props;            
            const endExpense = expenses && expenses.length > 0 ? expenses[0] : null;             
            fetch(this.state.pageSize, null, endExpense)
                .then(() => {
                    this.setState(state => {
                        return {
                            pageNumber: state.pageNumber - 1
                        };
                    });
                });
        }else {
            this.setState(state => ({}));
        }              
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="content-container">
                    Fetching expenses...
                </div>
            )
        }

        if (this.props.error) {
            return (
                <div>
                    Error fetching expenses
                </div>
            )
        }

        return (
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile"><h3>Expenses</h3></div>
                <div className="show-for-desktop"><h3>Expense</h3></div>
                <div className="show-for-desktop"><h3>Amount</h3></div>
            </div>
            <div className="list-body">
             {
                 this.props.count == 0 ? 
                 ( <div className="list-item list_item--message">
                     <span>No expenses</span>
                   </div> ) :
                 this.props.expenses.map((item, index) => (
                     <ExpenseItem key={item.id} 
                                  {...item} 
                      />
                 ))
             }
                <Pagination currentPage={this.state.pageNumber} totalPages={this.getTotalPages(this.props.count, this.state.pageSize)} 
                            onNextClick={this.onNextPageClick} onPrevClick={this.onPrevPageClick} />
             </div>
         </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    expenses:  state.expenses.items, //filteredExpenses(state.expenses, state.filters)
    count: state.expenses.count,
    loading: state.expenses.loading,
    error: state.expenses.error
});

const mapDispatchToProps = (dispatch) => ({
    fetch: (pageSize, startKey, endKey, startExpense ) => dispatch(fetchExpenses(pageSize, startKey, endKey, startExpense)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);



