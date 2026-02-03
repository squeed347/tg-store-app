const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="category-tabs">
    {categories.map(category => (
      <button
        key={category.id}
        onClick={() => onCategoryChange(category.id)}
        className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
      >
        <span>{category.emoji}</span>
        {category.name}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
