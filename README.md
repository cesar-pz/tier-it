# Tier It

Ad-free educational ranking game - Create and compare tier lists!

## 🎯 Features

- **Drag-and-Drop Interface**: Easily organize items into tiers (S, A, B, C, F, Never)
- **Save Your Rankings**: Store multiple tier lists locally in your browser
- **Compare Lists**: Calculate similarity scores between different tier lists
- **Fully Responsive**: Works on desktop, tablet, and mobile devices
- **Modern Design**: Clean, dark theme with smooth animations

## 🚀 Getting Started

1. Open `index.html` in your web browser
2. Drag items from the "Available Items" pool into the tier rows
3. Click "Save Tier List" to save your ranking
4. Click "Compare Lists" to see how similar different tier lists are
5. Click "Reset" to move all items back to the pool

## 📱 How to Use

### Creating a Tier List
- **Drag items** from the bottom pool into any tier row
- **Move between tiers** by dragging items from one tier to another
- **Return to pool** by dragging items back to the "Available Items" section

### Saving Your Work
- Click the **"Save Tier List"** button to save your current ranking
- Each list is automatically named (Tier List 1, 2, 3...) with a timestamp
- Your tier lists are saved in your browser's local storage

### Comparing Tier Lists
1. Click the **"Compare Lists"** button
2. Select any **two saved lists** by clicking on them
3. View the **similarity score** (0-100%) showing how similar the lists are
4. See a detailed breakdown of matches and differences by tier

### Resetting
- Click **"Reset"** to move all items back to the pool and start fresh
- Your saved tier lists are preserved

## 🛠 Technical Details

- **No Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Offline-First**: Works without an internet connection
- **Local Storage**: All data stored locally in your browser
- **Responsive Design**: Optimized for all screen sizes

## 📊 Similarity Calculation

The similarity score is calculated by:
1. Counting all unique items across both tier lists
2. Finding items that are in the same tier in both lists
3. Computing the percentage: (matching items / total items) × 100

**Example**: If 3 out of 4 items are in the same tier = 75% similarity

## 🎨 Tier System

- **S Tier**: The best (Red)
- **A Tier**: Excellent (Orange)
- **B Tier**: Good (Yellow)
- **C Tier**: Average (Light Yellow)
- **F Tier**: Below Average (Light Green)
- **Never Tier**: Worst (Light Blue)

## 📄 License

See LICENSE file for details.
