import React, { useState } from 'react';
import './App.css'; // 必要であればCSSのインポート
import { DynamoDB } from 'aws-sdk'; // AWS SDKのインポート
import dynamoDb from './DynamoClient';


function App() {
    const [itemName, setItemName] = useState('');
    const [itemId, setItemId] = useState('');  // IDのためのステート
    const [items, setItems] = useState([]);

    const addItem = async () => {
        const params = {
            TableName: 'Todo-fgiooqw24belfk2fjlrfrsli3q-dev',
            Item: {
                id: itemId,  // ここで指定されたIDを使用
                name: itemName
            }
        };

        try {
            await dynamoDb.put(params).promise();
            alert('Item added successfully');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const deleteItem = async () => {
        const params = {
            TableName: 'Todo-fgiooqw24belfk2fjlrfrsli3q-dev',
            Key: {
                id: itemId  // ここで指定されたIDを使用
            }
        };

        try {
            await dynamoDb.delete(params).promise();
            alert('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const getItems = async () => {
      const params = {
          TableName: 'Todo-fgiooqw24belfk2fjlrfrsli3q-dev'
      };
  
      try {
          const data = await dynamoDb.scan(params).promise();
          return data.Items || [];  // ここで空の配列をデフォルトとして返すように修正
      } catch (error) {
          console.error('Error getting items:', error);
          return [];  // エラーの場合も空の配列を返す
      }
  };
  
  

    const handleGetItems = async () => {
      try {
          const retrievedItems = await getItems();
          setItems(retrievedItems);
      } catch (error) {
          console.error('Error retrieving items:', error);
      }
  };


  return (
    <div className="App">
        <input
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Item ID"
        />
        <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item name"
        />
        <button onClick={addItem}>Add Item</button>
        <button onClick={deleteItem}>Delete Item by ID</button>
        <button onClick={handleGetItems}>Get Items</button>

        <table className="centered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

}

export default App;


