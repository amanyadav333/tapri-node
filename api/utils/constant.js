class DatabaseTable{
    static users="Users";
    static category="Category";
    static products="FoodProducts";
    static cart="Cart";
}

class CartTable{
    static id="id";
    static foodProductId="food_product_id";
    static created="created_at";
    static spiceness="spiceness";
    static quantity="quantity";
    static addSauce="add_sauce";
    static comment="comment";
    static userId="user_id";
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
    static name="name";
    static description="description";
    static price="price";
    static isActive="is_active";
    static created="created_at";
    static categoryId="category_id";
    static userId="user_id";
    static image="image";
}


module.exports = {
    user:UserTable,
    products:ProductsTable,
    category:CategoryTable,
    cart:CartTable,
    dbTable:DatabaseTable,
};
