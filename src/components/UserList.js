import React from 'react';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-bootstrap4';
import { PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Button } from 'reactstrap';

const UserList = ({ users, onUserSelect, onEditUser, onDeleteUser }) => {
  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    {
      name: 'action',
      title: 'Actions',
      getCellValue: (row) => (
        <div>
          <Button size="sm" color="secondary" onClick={() => { onUserSelect(row); onEditUser(); }}>
            Edit
          </Button>{' '}
          <Button size="sm" color="danger" onClick={() => handleDeleteConfirmation(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Silme işlemi için onay penceresi
  const handleDeleteConfirmation = (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="mb-5">
      <Grid rows={users} columns={columns}>
        <PagingState defaultCurrentPage={0} pageSize={10} />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    </div>
  );
}

export default UserList;
