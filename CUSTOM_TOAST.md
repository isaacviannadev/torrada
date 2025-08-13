# Custom Toast - Torrada

The custom toast functionality allows you to create highly customizable notifications with JSX content, custom styles, icons, and interactive actions.

## Overview

The custom toast extends the existing toast system with the following features:

- **Custom content**: Complete personalized JSX rendering
- **Custom icons**: Personalized icons for each toast
- **Custom actions**: Interactive buttons and controls
- **Custom styles**: Inline CSS and custom CSS classes
- **Flexible layout**: Support for different layout structures

## Basic Usage

### `customToast` Hook

```tsx
import { useToast } from 'torrada';

function MyComponent() {
  const { customToast } = useToast();

  const showCustomToast = () => {
    customToast({
      title: 'Custom Title',
      description: 'Optional description',
      customContent: <div>Custom JSX content</div>,
      duration: 5000, // optional
    });
  };

  return <button onClick={showCustomToast}>Show Custom Toast</button>;
}
```

## Available Properties

### `customContent`
Renders completely personalized JSX content, replacing the default layout.

```tsx
customToast({
  customContent: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '20px'
      }}>
        🎨
      </div>
      <div>
        <div style={{ fontWeight: 'bold' }}>Design System</div>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>Custom notification</div>
      </div>
    </div>
  ),
});
```

### `customIcon`
Adds a personalized icon next to the title and description.

```tsx
customToast({
  title: 'Toast with Icon',
  description: 'This toast has a custom icon',
  customIcon: (
    <div style={{ 
      width: '24px', 
      height: '24px', 
      borderRadius: '50%', 
      background: '#8b5cf6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '14px'
    }}>
      ⭐
    </div>
  ),
});
```

### `customActions`
Adds interactive buttons and controls to the toast.

```tsx
customToast({
  title: 'Interactive Toast',
  description: 'Click the buttons below to interact',
  customActions: (
    <>
      <button 
        onClick={() => console.log('Action 1 executed!')}
        style={{
          background: '#10b981',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
        }}
      >
        Action 1
      </button>
      <button 
        onClick={() => console.log('Action 2 executed!')}
        style={{
          background: '#f59e0b',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
        }}
      >
        Action 2
      </button>
    </>
  ),
});
```

### `customStyle`
Applies inline CSS styles to the toast.

```tsx
customToast({
  title: 'Styled Toast',
  description: 'Toast with custom styles',
  customStyle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
  },
});
```

### `customClassName`
Adds custom CSS classes to the toast.

```tsx
customToast({
  title: 'Toast with Custom Class',
  customClassName: 'my-custom-toast',
});

// Corresponding CSS
.my-custom-toast {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border-radius: 20px;
}
```

## Rendering Modes

### Custom Content Mode
When `customContent` is provided, the toast renders only the personalized content along with the close button.

### Default Layout Mode
When `customContent` is not provided, the toast uses the default layout with support for:
- Title and description
- Custom icon (if provided)
- Custom actions (if provided)
- Close button

## CSS Styles

The custom toast includes specific CSS styles:

```css
.t-item.custom {
  border-left: 4px solid #8b5cf6; /* Purple border for custom toasts */
}

.t-custom-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.t-custom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.t-custom-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.t-custom-actions button {
  padding: 4px 8px;
  background: transparent;
  border: 1px solid var(--toast-border);
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.t-custom-actions button:hover {
  background: var(--toast-border);
  color: var(--toast-fg);
}
```

## Usage Examples

### System Notification Toast
```tsx
customToast({
  customContent: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ 
        width: '32px', 
        height: '32px', 
        borderRadius: '50%', 
        background: '#10b981',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '16px'
      }}>
        ✓
      </div>
      <div>
        <div style={{ fontWeight: 'bold' }}>System Updated</div>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>New version available</div>
      </div>
    </div>
  ),
  duration: 8000,
});
```

### Confirmation Toast
```tsx
customToast({
  title: 'Confirm Action',
  description: 'Are you sure you want to continue?',
  customActions: (
    <>
      <button 
        onClick={() => handleConfirm()}
        style={{
          background: '#10b981',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Confirm
      </button>
      <button 
        onClick={() => handleCancel()}
        style={{
          background: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </>
  ),
  duration: 0, // Doesn't close automatically
});
```

### Progress Toast
```tsx
customToast({
  title: 'Processing...',
  customContent: (
    <div style={{ width: '100%' }}>
      <div style={{ 
        width: '100%', 
        height: '4px', 
        background: '#e5e7eb', 
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div 
          style={{ 
            width: '60%', 
            height: '100%', 
            background: '#3b82f6',
            transition: 'width 0.3s ease'
          }} 
        />
      </div>
      <div style={{ marginTop: '8px', fontSize: '14px', opacity: 0.8 }}>
        60% completed
      </div>
    </div>
  ),
  duration: 0, // Doesn't close automatically
});
```

## Accessibility Considerations

- The custom toast maintains support for appropriate `aria-live` and `role` attributes
- The close button is always available for keyboard navigation
- Support for keyboard navigation (ESC to close)
- Maintains compatibility with screen readers

## Compatibility

- ✅ React 18+
- ✅ TypeScript
- ✅ All modern browsers
- ✅ Light/dark theme support
- ✅ Customizable CSS animations
- ✅ Responsive and mobile-friendly

## Limitations

- `customContent` completely replaces the default layout
- Inline styles take precedence over CSS styles
- Custom actions must be valid React components
- Very long duration may impact performance with many toasts
