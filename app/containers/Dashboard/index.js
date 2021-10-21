/**
 *
 * Dashboard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../../components/Header/Loadable';
import reducer from './reducer';
import saga from './saga';
import { logout } from '../User/actions';
import * as actions from './actions';
import {
  makeSelectVaccine,
  makeSelectProcessingVaccine,
  makeSelectSuccessVaccine,
  makeSelectErrorVaccine,
  makeSelectCentre,
  makeSelectProcessingCentre,
  makeSelectSuccessCentre,
  makeSelectErrorCentre,
  makeSelectTransactions,
} from './selectors';
import { makeSelectInfo } from '../User/selectors';
import ListData from "containers/ListData";
import FormDialog from '../../components/FormDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  title: {
    flexGrow: 1,
  },
  usernameTitle: {
    flexGrow: 1,
    margin: theme.spacing(0, 0, 4),
    fontWeight: theme.typography.fontWeightBold,
    color: '#303030',
  },
  submit: {
    backgroundColor: '#aaaaaa',
    borderRadius: '0px',
    fontSize: '20px',
    color: '#fff',
    fontWeight: theme.typography.fontWeightBold,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  box: {
    backgroundColor: '#DADADA',
    overflow: 'hidden',
  },
  item: {
    padding: theme.spacing(2),
  },
  bold: {
    fontWeight: 600,
  },
  divider: {
    borderBottom: '2px solid #fff',
  },
  itemTitle: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    backgroundColor: '#DADADA',
    padding: theme.spacing(2),
  },
  chip: {
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: '#aaaaaa',
    margin: theme.spacing(0.5),
    color: '#ffff',
  },
}));

export function Dashboard(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const [currentTransaction, setCurrentTransaction] = useState({id:null, name:'', description:'', amount:'', type:''});
  const classes = useStyles();
  const {
    signOut,
    info,
    history,
    transactions,
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
  } = props;

  useEffect(() => {
    getTransactions();
  }, []);

  const editTransaction = (id) => {
    const current = transactions.data.find(f => f._id === id)
    setCurrentTransaction(current);
    setOpen(true);
  }

  const onChange = ({ target: { name, value } }) => {
    setCurrentTransaction(prevState => ({ ...prevState, [name]: value }));
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const payload = {
      name:currentTransaction.name,
      description:currentTransaction.description,
      amount:currentTransaction.amount,
      type:currentTransaction.type,
    }
    if(currentTransaction._id){
      updateTransaction(currentTransaction._id,payload)
    }else{
      createTransaction(payload)
    }
    handleClose();
    setCurrentTransaction({id:null, name:'', description:'', amount:'', type:''})
  }

  return (
    <article>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      <Header
        signOut={signOut}
        info={info}
        history={history}
        text="Dashboard"
      />
         <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{margin:10}}>
          Add New
        </Button>
      <Container>
   
        <Grid item xs={12} spacing={3}>
          <ListData 
            transactions={transactions.data}
            editTransaction={editTransaction}
            updateTransaction={updateTransaction}
            deleteTransaction={deleteTransaction}
          />
        </Grid>
      </Container>
      <FormDialog 
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        currentTransaction={currentTransaction}
        onChange={onChange}
        handleSubmit={handleSubmit}
      />
    </article>
  );
}

Dashboard.propTypes = {
  transactions: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(logout()),
    getTransactions: () => dispatch(actions.getTransactions()),
    createTransaction: (payload) => dispatch(actions.createTransaction(payload)),
    updateTransaction: (id, payload) => dispatch(actions.updateTransaction(id, payload)),
    deleteTransaction: (id) => dispatch(actions.deleteTransaction(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
