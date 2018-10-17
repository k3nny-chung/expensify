import React from 'react';

class Pagination extends React.Component {
    
    onPrevClick = (e) => {
        e.preventDefault();
        this.props.onPrevClick();
    }

    onNextClick = (e) => {
        e.preventDefault();
        this.props.onNextClick();
    }
    
    render() {
        return (
            <div className="pagination">
               {this.props.currentPage > 1 && <a className="pagination__item" href="#" onClick={this.onPrevClick}>&laquo;&nbsp;Previous</a> }
               <span className="pagination__item">{this.props.currentPage} of {this.props.totalPages}</span>
               {this.props.currentPage < this.props.totalPages && <a className="pagination__item" href="#" onClick={this.onNextClick}>Next&nbsp;&raquo;</a> } 
            </div>
        );
    }
} 


export default Pagination;

