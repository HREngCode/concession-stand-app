import React, { useState } from 'react';
import { CartItem } from './components/Cart';
import { MenuItem } from './types';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  Box,
  CssBaseline,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';

const sampleMenuItems = [
  {
    id: 1,
    name: 'Popcorn',
    description: 'Freshly popped popcorn',
    price: 5.99,
    imageUrl: 'https://via.placeholder.com/400x300?text=Popcorn',
    category: 'Snacks',
  },
  {
    id: 2,
    name: 'Soda',
    description: 'Refreshing cold drink',
    price: 3.99,
    imageUrl: 'https://via.placeholder.com/400x300?text=Soda',
    category: 'Drinks',
  },
  {
    id: 3,
    name: 'Nachos',
    description: 'Cheesy nachos with jalapenos',
    price: 7.99,
    imageUrl: 'https://via.placeholder.com/400x300?text=Nachos',
    category: 'Snacks',
  },
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id: number, change: 'increase' | 'decrease') => {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prev;

      const updatedItem = { ...prev[itemIndex] };
      if (change === 'increase') {
        updatedItem.quantity += 1;
      } else if (change === 'decrease' && updatedItem.quantity > 1) {
        updatedItem.quantity -= 1;
      }

      return [...prev.slice(0, itemIndex), updatedItem, ...prev.slice(itemIndex + 1)];
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Concession Stand
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Routes>
            <Route
              path="/"
              element={
                <MenuItems
                  items={sampleMenuItems}
                  onAddToCart={addToCart}
                />
              }
            />
          </Routes>
        </Box>
      </Container>
      <Cart
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={removeItem}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          // TODO: Implement checkout logic
          alert('Checkout functionality will be implemented in the backend');
          setCartItems([]);
          setCartOpen(false);
        }}
        isOpen={cartOpen}
      />
    </Router>
  );
}

export default App;
