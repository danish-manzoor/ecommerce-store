interface CategorySidebarProps {
    categories: any[];
    selectedCategoryId: number[];
    handleCategories: (id: number) => void;
}
const CategorySidebar = ({
    categories,
    selectedCategoryId,
    handleCategories,
}: CategorySidebarProps) => {
    return (
        <div>
            {categories.map((category: any) => (
                <label key={category.id} className="flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                        checked={selectedCategoryId.includes(category.id)}
                        onChange={() => handleCategories(category.id)}
                    />
                    <span className="ml-2">{category.name}</span>
                </label>
            ))}
        </div>
    );
};

export default CategorySidebar;
