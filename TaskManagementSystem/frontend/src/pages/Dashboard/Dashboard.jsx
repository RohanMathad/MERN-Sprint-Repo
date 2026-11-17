import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Table from '../../components/table/Table.jsx';
import Modal from '../../components/general/Modal.jsx';
import api from '../../api/axiosInstance.js';
import { FormGroup, Label, Input, Select, Button, TextArea } from '../../components/general/FormElements.jsx';
import { formatIsoDate } from '../../utils/dateFormatter.js';
import IconPicker from '../../components/general/IconPicker.jsx';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  min-height: 0;
  gap: 20px;
  overflow: hidden;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    color: ${(props) => props.theme.colors.text};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    color: ${(props) => props.theme.colors.text};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  
  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const DetailRow = styled.div`
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.text};
  span {
    font-weight: bold;
    color: ${(props) => props.theme.colors.textSecondary};
    margin-right: 8px;
  }
`;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Master state for which modal is open ('create', 'view', 'edit', 'delete', or null)
  const [activeModal, setActiveModal] = useState(null);

  // Holds the task currently being viewed/deleted
  const [selectedTask, setSelectedTask] = useState(null);

  // FIXED: Added missing editTask state for the Edit Modal
  const [editTask, setEditTask] = useState(null);

  // Add icon to newTask default state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
    icon: 'CheckCircle', // Default icon
    project_id: 7
  });

  // Table Columns
  const taskColumns = [
    { header: '', accessor: 'icon', type: 'icon', width: '50px' },
    { header: 'ID', accessor: 'id', width: '80px' },
    { header: 'Title', accessor: 'title' },
    { header: 'Status', accessor: 'status', width: '150px' },
    { header: 'Due Date', accessor: 'due_date', width: '250px', type: 'date' }
  ];

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      const sortedTasks = response.data.data.sort((a, b) => b.id - a.id);
      setTasks(sortedTasks);
    } catch (err) {
      setError('Failed to fetch tasks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRowClick = (task) => {
    setSelectedTask(task);
    setActiveModal('view');
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', newTask);
      setNewTask({ title: '', description: '', status: 'pending', due_date: '', icon: 'CheckCircle', project_id: 7 });
      setActiveModal(null);
      fetchTasks();
    } catch (err) {
      alert('Failed to create task.');
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editTask.id}`, editTask);
      setActiveModal(null);
      fetchTasks();
    } catch (err) {
      alert('Failed to update task.');
    }
  };

  const handleDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${selectedTask.id}`);
      setActiveModal(null);
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task.');
    }
  };

  const openEditMode = () => {
    const formattedDate = selectedTask.due_date ? selectedTask.due_date.split('T')[0] : '';
    setEditTask({ ...selectedTask, due_date: formattedDate });
    setActiveModal('edit');
  };

  return (
    <DashboardContainer>
      <PageHeader>
        <h1>Task Dashboard</h1>
        <Button onClick={() => setActiveModal('create')}>+ New Task</Button>
      </PageHeader>

      {/* --- 1. CREATE MODAL --- */}
      <Modal isOpen={activeModal === 'create'} onClose={() => setActiveModal(null)}>
        <ModalHeader>
          <h3>Create a New Task</h3>
          <CloseButton onClick={() => setActiveModal(null)}>&times;</CloseButton>
        </ModalHeader>
        <form onSubmit={handleCreateTask}>
          <FormGroup>
            <Label>Task Icon</Label>
            <IconPicker
              selectedIcon={newTask.icon}
              onSelect={(selectedName) => setNewTask({ ...newTask, icon: selectedName })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Task Title</Label>
            <Input type="text" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          </FormGroup>
          <div style={{ display: 'flex', gap: '15px' }}>
            <FormGroup style={{ flex: 1 }}>
              <Label>Status</Label>
              <Select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <Label>Due Date</Label>
              <Input type="date" required value={newTask.due_date} onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })} />
            </FormGroup>
          </div>
          <Button type="submit" style={{ width: '100%', marginTop: '10px' }}>Save Task</Button>
        </form>
      </Modal>

      {/* --- 2. VIEW MODAL --- */}
      <Modal isOpen={activeModal === 'view'} onClose={() => setActiveModal(null)}>
        <ModalHeader>
          <h3>Task Details</h3>
          <CloseButton onClick={() => setActiveModal(null)}>&times;</CloseButton>
        </ModalHeader>
        {selectedTask && (
          <>
            <DetailRow><span>ID:</span> {selectedTask.id}</DetailRow>
            <DetailRow><span>Title:</span> {selectedTask.title}</DetailRow>
            <DetailRow><span>Status:</span> {selectedTask.status.replace('_', ' ').toUpperCase()}</DetailRow>
            <DetailRow><span>Due Date:</span> {selectedTask.due_date ? formatIsoDate(selectedTask.due_date, 'long') : '-'}</DetailRow>
            <DetailRow><span>Project ID:</span> {selectedTask.project_id}</DetailRow>
            <DetailRow style={{ marginTop: '20px' }}>
              <span>Description:</span>
              <div style={{ marginTop: '8px', padding: '12px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                {selectedTask.description || 'No description provided.'}
              </div>
            </DetailRow>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <Button style={{ flex: 1 }} onClick={openEditMode}>Edit Task</Button>
              <Button style={{ flex: 1, backgroundColor: '#dc3545' }} onClick={() => setActiveModal('delete')}>Delete Task</Button>
            </div>
          </>
        )}
      </Modal>

      {/* --- 3. EDIT MODAL --- */}
      <Modal isOpen={activeModal === 'edit'} onClose={() => setActiveModal('view')}>
        <ModalHeader>
          <h3>Edit Task</h3>
          <CloseButton onClick={() => setActiveModal('view')}>&times;</CloseButton>
        </ModalHeader>
        {editTask && (
          <form onSubmit={handleUpdateTask}>
            <FormGroup>
              <Label>Task Icon</Label>
              {/* FIXED: Now correctly references editTask instead of newTask */}
              <IconPicker
                selectedIcon={editTask.icon || 'CheckCircle'}
                onSelect={(selectedName) => setEditTask({ ...editTask, icon: selectedName })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Task Title</Label>
              <Input type="text" required value={editTask.title} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <TextArea value={editTask.description || ''} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} />
            </FormGroup>

            {/* Side-by-side container */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <FormGroup style={{ flex: 1 }}>
                <Label>Status</Label>
                <Select value={editTask.status} onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </FormGroup>

              <FormGroup style={{ flex: 1 }}>
                <Label>Due Date</Label>
                <Input type="date" required value={editTask.due_date} onChange={(e) => setEditTask({ ...editTask, due_date: e.target.value })} />
              </FormGroup>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <Button type="submit" style={{ flex: 1 }}>Update</Button>
              <Button type="button" style={{ flex: 1, backgroundColor: '#6c757d' }} onClick={() => setActiveModal('view')}>Cancel</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* --- 4. DELETE CONFIRMATION MODAL --- */}
      <Modal isOpen={activeModal === 'delete'} onClose={() => setActiveModal('view')}>
        <ModalHeader>
          <h3>Confirm Delete</h3>
          <CloseButton onClick={() => setActiveModal('view')}>&times;</CloseButton>
        </ModalHeader>
        {selectedTask && (
          <>
            <p style={{ color: 'var(--text)' }}>
              Are you sure you want to delete task <strong>#{selectedTask.id} {selectedTask.title}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <Button style={{ flex: 1, backgroundColor: '#6c757d' }} onClick={() => setActiveModal('view')}>Cancel</Button>
              <Button style={{ flex: 1, backgroundColor: '#dc3545' }} onClick={handleDeleteTask}>Yes, Delete</Button>
              
            </div>
          </>
        )}
      </Modal>

      {/* DATA TABLE */}
      {loading ? (
        <p style={{ color: 'var(--text)' }}>Loading tasks...</p>
      ) : error ? (
        <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <Table columns={taskColumns} data={tasks} rowsPerPage={6} onRowClick={handleRowClick} />
      )}
    </DashboardContainer>
  );
};

export default Dashboard;