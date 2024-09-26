import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/UserList';
import OrderList from './components/OrderList';
import UserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Stil dosyasını güncellenmiş konumdan yüklüyoruz

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // API'den kullanıcı verilerini çekme
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => setUsers(data.users))
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }, []);

  // Modal açma ve kapama fonksiyonu
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Kullanıcı seçimi fonksiyonu
  const onUserSelect = (row) => {
    setSelectedUser(row);
  };

  // Kullanıcı ekleme veya düzenleme işlemi
  const handleSaveUser = (user) => {
    if (selectedUser) {
      // Düzenleme işlemi
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Yeni kullanıcı ekleme
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    toggleModal();
    showNotification(`User ${user.firstName} ${user.lastName} successfully saved!`, 'success');
  };

  // Kullanıcı silme işlemi
  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    // Kullanıcıya bildirim göster
    showNotification(
      <div>
        <p>Are you sure you want to delete {user.firstName} {user.lastName}?</p>
        <Button size="sm" color="danger" onClick={() => confirmDeleteUser(userId)}>Delete</Button>
      </div>,
      'info',
      { autoClose: false }
    );
  };

  // Silme işlemi onaylandıktan sonra çağrılan fonksiyon
  const confirmDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
    }
    toast.dismiss(); // Açık olan bildirimleri kapat
    showNotification('User successfully deleted!', 'success');
  };

  // Bildirim fonksiyonu
  const showNotification = (message, type = 'info', options = {}) => {
    toast[type](message, {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      ...options,
    });
  };

  return (
    <div className="App">
      <Container>
        <h2 className="text-center my-4">User and Order Management</h2>
        <Button color="primary" className="mb-3" onClick={() => { setSelectedUser(null); toggleModal(); }}>
          Add New User
        </Button>
        <UserList
          users={users}
          onUserSelect={onUserSelect}
          onEditUser={() => toggleModal()}
          onDeleteUser={handleDeleteUser}
        />

        {selectedUser && (
          <>
            <h2 className="text-center my-4">
              Order List for {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <OrderList userId={selectedUser.id} />
          </>
        )}

        {/* Kullanıcı Ekleme ve Düzenleme Modalı */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            {selectedUser ? 'Edit User' : 'Add New User'}
          </ModalHeader>
          <ModalBody>
            <UserForm
              user={selectedUser}
              onSaveUser={handleSaveUser}
              onCancel={toggleModal}
            />
          </ModalBody>
        </Modal>

        {/* Bildirim Container */}
        <ToastContainer />
      </Container>
    </div>
  );
}

export default App;
