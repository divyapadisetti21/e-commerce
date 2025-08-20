import React, { useState } from 'react';
import styled from 'styled-components';
import AddItem from '../../components/admin/AddItem';
import ProductList from '../../components/admin/ProductList';

const AdminContainer = styled.div` display: flex; `;
const Sidebar = styled.div`
  flex: 1;
  max-width: 200px;
  background: #f4f4f4;
  min-height: 100vh;
  padding: 1rem;
`;
const Content = styled.div` flex: 4; padding: 2rem; `;
const SidebarButton = styled.button`
  display: block; width: 100%; padding: 1rem;
  background: ${props => props.isActive ? '#ccc' : 'transparent'};
  border: none; text-align: left; font-size: 1rem; cursor: pointer;
  margin-bottom: 0.5rem;
`;

const AdminPanelScreen = () => {
    const [view, setView] = useState('list');
    return (
        <AdminContainer>
            <Sidebar>
                <h3>ADMIN PANEL</h3>
                <SidebarButton isActive={view === 'add'} onClick={() => setView('add')}>Add Items</SidebarButton>
                <SidebarButton isActive={view === 'list'} onClick={() => setView('list')}>List Items</SidebarButton>
                <SidebarButton isActive={view === 'orders'} onClick={() => setView('orders')}>Orders</SidebarButton>
            </Sidebar>
            <Content>
                {view === 'add' && <AddItem />}
                {view === 'list' && <ProductList />}
                {view === 'orders' && <h2>Orders Page</h2>}
            </Content>
        </AdminContainer>
    );
};
export default AdminPanelScreen;