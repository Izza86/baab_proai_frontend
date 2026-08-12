import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { fetchItems, createItem, updateItem, deleteItem } from '../services/itemsApi';
import { Button } from '../components/ui/Button/Button';
import { Input } from '../components/ui/Input/Input';
import { Card, CardBody } from '../components/ui/Card/Card';

interface Item {
  id: string;
  title: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    if (!session) return;
    try {
      const data = await fetchItems(session.access_token);
      setItems(data);
    } catch (err) {
      toast.error('Could not load items');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [session]);

  async function handleAdd() {
    if (!session || !newTitle.trim()) return;
    try {
      await createItem(session.access_token, { title: newTitle, status: 'pending' });
      setNewTitle('');
      toast.success('Item added!');
      loadItems();
    } catch {
      toast.error('Failed to add item');
    }
  }

  async function handleToggleStatus(item: Item) {
    if (!session) return;
    const newStatus = item.status === 'pending' ? 'completed' : 'pending';
    try {
      await updateItem(session.access_token, item.id, { status: newStatus });
      toast.success('Item updated!');
      loadItems();
    } catch {
      toast.error('Failed to update item');
    }
  }

  async function handleDelete(itemId: string) {
    if (!session) return;
    try {
      await deleteItem(session.access_token, itemId);
      toast.success('Item deleted!');
      loadItems();
    } catch {
      toast.error('Failed to delete item');
    }
  }

  if (loading) return <p>Loading items...</p>;

  return (
    <div style={{ padding: '24px' }}>
      <h1>My Items</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <Input
          label=""
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New item title..."
        />
        <Button variant="primary" onClick={handleAdd}>Add Item</Button>
      </div>

      {items.length === 0 ? (
        <p>No items yet. Add one above!</p>
      ) : (
        items.map((item) => (
          <Card key={item.id} style={{ marginBottom: '12px' }}>
            <CardBody style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{item.title}</strong> — <span>{item.status}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="outline" size="sm" onClick={() => handleToggleStatus(item)}>
                  Toggle Status
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default Dashboard;