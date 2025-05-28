import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Button,
  Box,
} from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onQuantityChange: (id: number, change: 'increase' | 'decrease') => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
  onCheckout: () => void;
  isOpen: boolean;
}

const Cart: React.FC<CartProps> = ({
  items,
  onQuantityChange,
  onRemoveItem,
  onClose,
  onCheckout,
  isOpen,
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box p={2} width="300px">
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>
        <List>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => onQuantityChange(item.id, 'decrease')}
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    edge="end"
                    onClick={() => onQuantityChange(item.id, 'increase')}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
