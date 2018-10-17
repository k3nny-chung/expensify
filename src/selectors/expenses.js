import moment from 'moment';

export default ({items}, {text, sortBy, startDate, endDate}) => {    
    return items.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? createdAtMoment.isSameOrAfter(startDate, 'day') : true;
        const endDateMatch = endDate? createdAtMoment.isSameOrBefore(endDate, 'day') : true;
        const textMatch = text.length === 0 || expense.description.toUpperCase().includes(text.toUpperCase()) || 
                         expense.note.toUpperCase().includes(text.toUpperCase());

        return startDateMatch && endDateMatch && textMatch;
    })
    .sort( (a, b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }else {
            return 0;
        }
    });
};

