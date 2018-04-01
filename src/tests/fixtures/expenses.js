import moment from 'moment';


export default [{
    id: 1,
    description: 'Office supplies',
    note: '',
    amount: 150,
    createdAt: 0
}, {
    id: 2,
    description: 'Lunch',
    note: '',
    amount: 2000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: 3,
    description: 'Car lease',
    note: '',
    amount: 35000,
    createdAt: moment(0).add(4, 'days').valueOf()    
}];