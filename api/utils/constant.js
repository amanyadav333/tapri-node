class DatabaseTable{
    static users="Users";
    static category="Category";
    static products="Products";
}

class UserTable{
    static id="id";
    static name="name";
    static mobile="mobile";
    static profile="profile";
    static email="email";
    static countryCode="country_code";
    static isActive="is_active";
    static role="role";
    static created="created_at";
    static updated="updated_at";
}

class CategoryTable{
    static id="id";
    static name="name";
    static image="image";
}
class ProductsTable{
    static id="id";
    static unique_id="unique_id";
    static name="name";
    static description="description";
    static price="price";
    static quantity="quantity";
    static isActive="is_active";
    static isProduct="is_product";
    static created="created_at";
    static parentCategoryId="parent_category_id";
    static childCategoryId="child_category_id";
    static userId="user_id";
    static image="image";
    static deliveryTime="delivery_time";
    static productCode="product_code";
}


module.exports = {
    user:UserTable,
    products:ProductsTable,
    category:CategoryTable,
    dbTable:DatabaseTable,
};
