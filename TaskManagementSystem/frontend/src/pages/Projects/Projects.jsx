import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Table from '../../components/table/Table.jsx';
import Modal from '../../components/general/Modal.jsx';
import api from '../../api/axiosInstance.js';
import { formatIsoDate } from '../../utils/dateFormatter.js';


import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FormGroup, Label, Input, Button } from '../../components/general/FormElements.jsx';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  
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

const ReportSection = styled.div`
  margin-bottom: 20px;
  
  h4 {
    color: ${(props) => props.theme.colors.textSecondary};
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  background-color: ${(props) => props.theme.colors.background};
  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  
  span:first-child {
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.textSecondary};
  }
  
  span:last-child {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors.text};
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
`;

const TaskCard = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.task-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    strong {
      color: ${(props) => props.theme.colors.text};
      font-size: 0.95rem;
    }
    span {
      color: ${(props) => props.theme.colors.textSecondary};
      font-size: 0.8rem;
    }
  }

  div.task-status {
    font-size: 0.8rem;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const Projects = () => {
  // Get the logged-in user from context
  const { user } = useContext(AuthContext);

  // Table State
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal States
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // NEW
  
  const [billingData, setBillingData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // New Project Form State
  const [newProject, setNewProject] = useState({ name: '', billing_budget: '' });

  const projectColumns = [
    { header: 'Project ID', accessor: 'id', width: '100px' },
    { header: 'Project Name', accessor: 'name' },
    { header: 'Billing Budget ($)', accessor: 'billing_budget', width: '200px' },
  ];

  // 1. Fetch initial list of projects for the Table
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch projects.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 2. Fetch nested billing data when a row is clicked
  const handleRowClick = async (project) => {
    setIsBillingModalOpen(true);
    setModalLoading(true);
    
    try {
      const response = await api.get(`/projects/${project.id}/billing`);
      setBillingData(response.data.data);
    } catch (err) {
      console.error('Failed to fetch project billing details:', err);
      alert('Failed to load billing report.');
      setIsBillingModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };


  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', newProject);
      setIsCreateModalOpen(false);
      setNewProject({ name: '', billing_budget: '' });
      // Refresh the table
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (err) {
      alert('Failed to create project. Make sure you are a Super Admin!');
    }
  };

  return (
    <ProjectsContainer>
      <PageHeader>
    <h1>Projects & Billing Directory</h1>
    {user?.role === 'super_admin' && (
      <Button onClick={() => setIsCreateModalOpen(true)}>+ New Project</Button>
    )}
  </PageHeader>
      
      {/* ANALYTICAL REPORT MODAL */}
      <Modal isOpen={isBillingModalOpen} onClose={() => setIsBillingModalOpen(false)}>
        <ModalHeader>
          <h3>Project Report</h3>
          <CloseButton onClick={() => setIsBillingModalOpen(false)}>&times;</CloseButton>
        </ModalHeader>
        
        {modalLoading ? (
          <p style={{ color: 'var(--text)' }}>Compiling report...</p>
        ) : billingData ? (
          <>
            <ReportSection>
              <h4>Overview</h4>
              <StatGrid>
                <Stat>
                  <span>Project Name</span>
                  <span>{billingData.name}</span>
                </Stat>
                <Stat>
                  <span>Active Tasks</span>
                  <span>{billingData.tasks?.length || 0} tasks assigned</span>
                </Stat>
                <Stat>
                  <span>Project ID</span>
                  <span># {billingData.id}</span>
                </Stat>
              </StatGrid>
            </ReportSection>

            <ReportSection>
              <h4>Task Breakdown</h4>
              <TaskList>
                {billingData.tasks && billingData.tasks.length > 0 ? (
                  billingData.tasks.map(task => (
                    <TaskCard key={task.id}>
                      <div className="task-info">
                        <strong>{task.title}</strong>
                        <span>Due: {task.due_date ? formatIsoDate(task.due_date, 'standard') : 'No Date'}</span>
                      </div>
                      <div className="task-status">
                        {task.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </TaskCard>
                  ))
                ) : (
                  <p style={{ color: 'var(--textSecondary)', fontSize: '0.9rem' }}>
                    No tasks have been billed to this project yet.
                  </p>
                )}
              </TaskList>
            </ReportSection>
          </>
        ) : null}
      </Modal>

      {/* CREATE PROJECT MODAL (Super Admin Only) */}
  <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
    <ModalHeader>
      <h3>Create New Project</h3>
      <CloseButton onClick={() => setIsCreateModalOpen(false)}>&times;</CloseButton>
    </ModalHeader>
    <form onSubmit={handleCreateProject}>
      <FormGroup>
        <Label>Project Name</Label>
        <Input 
          type="text" 
          required 
          value={newProject.name} 
          onChange={(e) => setNewProject({...newProject, name: e.target.value})} 
        />
      </FormGroup>
      <FormGroup>
        <Label>Billing Budget ($)</Label>
        <Input 
          type="number" 
          required 
          value={newProject.billing_budget} 
          onChange={(e) => setNewProject({...newProject, billing_budget: e.target.value})} 
        />
      </FormGroup>
      <Button type="submit" style={{ width: '100%', marginTop: '10px' }}>Create Project</Button>
    </form>
  </Modal>

      {/* DATA TABLE */}
      {loading ? (
        <p style={{ color: 'var(--text)' }}>Loading projects...</p>
      ) : error ? (
        <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <Table columns={projectColumns} data={projects} onRowClick={handleRowClick} />
      )}
    </ProjectsContainer>
  );
};

export default Projects;